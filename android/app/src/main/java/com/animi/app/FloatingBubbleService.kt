package com.animi.app

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log

class FloatingBubbleService : Service() {

    private var bubbleManager: FloatingBubbleManager? = null

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("FloatingBubbleService", "Service started")
        
        val avatarUrl = intent?.getStringExtra("avatarUrl") ?: ""
        
        if (bubbleManager == null) {
            bubbleManager = FloatingBubbleManager(applicationContext)
        }
        
        bubbleManager?.show(avatarUrl)
        
        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        bubbleManager?.hide()
        bubbleManager = null
        Log.d("FloatingBubbleService", "Service destroyed")
    }
}