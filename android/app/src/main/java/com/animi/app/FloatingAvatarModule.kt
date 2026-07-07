package com.animi.app

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class FloatingAvatarModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    init {
        Log.d("FloatingAvatar", "FloatingAvatarModule initialized!")
    }

    override fun getName() = "FloatingAvatar"

    @ReactMethod
    fun showAvatar(avatarUrl: String, promise: Promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && 
                !Settings.canDrawOverlays(reactContext)) {
                val intent = Intent(
                    Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:${reactContext.packageName}")
                )
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                reactContext.startActivity(intent)
                promise.reject("PERMISSION_DENIED", "Overlay permission not granted")
                return
            }

            val serviceIntent = Intent(reactContext, FloatingBubbleService::class.java).apply {
                putExtra("avatarUrl", avatarUrl)
            }
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                reactContext.startForegroundService(serviceIntent)
            } else {
                reactContext.startService(serviceIntent)
            }
            
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e("FloatingAvatar", "Error: ${e.message}")
            promise.reject("ERROR", e.message)
        }
    }

    @ReactMethod
    fun hideAvatar(promise: Promise) {
        try {
            val serviceIntent = Intent(reactContext, FloatingBubbleService::class.java)
            reactContext.stopService(serviceIntent)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
}