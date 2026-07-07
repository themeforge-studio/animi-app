package com.animi.app

import android.content.Context
import android.graphics.PixelFormat
import android.os.Build
import android.view.Gravity
import android.view.MotionEvent
import android.view.WindowManager
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout

class FloatingBubbleManager(private val context: Context) {

    private var windowManager: WindowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    private var floatingView: FrameLayout? = null
    private var webView: WebView? = null

    private val layoutParams: WindowManager.LayoutParams by lazy {
        val type = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
        else
            @Suppress("DEPRECATION") WindowManager.LayoutParams.TYPE_PHONE

        WindowManager.LayoutParams(
            320, 520, type,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        ).apply {
            gravity = Gravity.TOP or Gravity.START
            x = 100
            y = 300
        }
    }

    fun show(avatarUrl: String) {
        if (floatingView != null) return

        floatingView = FrameLayout(context)
        webView = WebView(context).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            webViewClient = WebViewClient()
            loadUrl(avatarUrl)
        }

        floatingView?.addView(webView, FrameLayout.LayoutParams(320, 520))

        var initialX = 0; var initialY = 0
        var initialTouchX = 0f; var initialTouchY = 0f

        floatingView?.setOnTouchListener { _, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> {
                    initialX = layoutParams.x; initialY = layoutParams.y
                    initialTouchX = event.rawX; initialTouchY = event.rawY; true
                }
                MotionEvent.ACTION_MOVE -> {
                    layoutParams.x = initialX + (event.rawX - initialTouchX).toInt()
                    layoutParams.y = initialY + (event.rawY - initialTouchY).toInt()
                    windowManager.updateViewLayout(floatingView, layoutParams); true
                }
                else -> false
            }
        }

        android.os.Handler(android.os.Looper.getMainLooper()).post {
            windowManager.addView(floatingView, layoutParams)
        }
    }

    fun hide() {
        android.os.Handler(android.os.Looper.getMainLooper()).post {
            floatingView?.let { windowManager.removeView(it) }
            floatingView = null
            webView = null
        }
    }
}