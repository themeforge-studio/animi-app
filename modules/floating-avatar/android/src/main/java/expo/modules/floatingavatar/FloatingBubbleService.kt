package expo.modules.floatingavatar

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log

class FloatingBubbleService : Service() {

    private var bubbleManager: FloatingBubbleManager? = null

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("FloatingBubbleService", "Service started")

        // IMPORTANTE: llamar startForeground inmediatamente
        startForegroundCompat()

        val avatarUrl = intent?.getStringExtra("avatarUrl") ?: ""

        if (bubbleManager == null) {
            bubbleManager = FloatingBubbleManager(applicationContext)
        }

        bubbleManager?.show(avatarUrl)

        return START_STICKY
    }

    private fun startForegroundCompat() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "animi_overlay"
            val channel = NotificationChannel(
                channelId,
                "Animi Asistente",
                NotificationManager.IMPORTANCE_LOW
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)

            val notification = Notification.Builder(this, channelId)
                .setContentTitle("Kira está activa")
                .setContentText("Tu asistente personal está corriendo")
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .build()

            startForeground(1, notification)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        bubbleManager?.hide()
        bubbleManager = null
        Log.d("FloatingBubbleService", "Service destroyed")
    }
}