package expo.modules.floatingavatar

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Build
import android.os.IBinder
import android.util.Log

class FloatingBubbleService : Service() {

    private var bubbleManager: FloatingBubbleManager? = null
    private var avatarUrl: String = ""
    private var homeReceiver: BroadcastReceiver? = null

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("FloatingBubbleService", "Service started")
        startForegroundCompat()

        avatarUrl = intent?.getStringExtra("avatarUrl") ?: ""

        if (bubbleManager == null) {
            bubbleManager = FloatingBubbleManager(applicationContext)
        }

        // Mostrar Kira al inicio
        bubbleManager?.show(avatarUrl)

        // Registrar receptor para detectar HOME y apps
        registerHomeReceiver()

        return START_STICKY
    }

    private fun registerHomeReceiver() {
        homeReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                when (intent?.action) {
                    Intent.ACTION_CLOSE_SYSTEM_DIALOGS -> {
                        val reason = intent.getStringExtra("reason")
                        if (reason == "homekey" || reason == "recentapps") {
                            // Usuario fue al home — mostrar Kira
                            bubbleManager?.show(avatarUrl)
                            Log.d("FloatingBubble", "Home detectado - mostrando Kira")
                        }
                    }
                    Intent.ACTION_SCREEN_OFF -> {
                        // Pantalla apagada — ocultar Kira
                        bubbleManager?.hide()
                    }
                    Intent.ACTION_SCREEN_ON -> {
                        // Pantalla encendida en home — mostrar Kira
                        bubbleManager?.show(avatarUrl)
                    }
                }
            }
        }

        val filter = IntentFilter().apply {
            addAction(Intent.ACTION_CLOSE_SYSTEM_DIALOGS)
            addAction(Intent.ACTION_SCREEN_OFF)
            addAction(Intent.ACTION_SCREEN_ON)
        }

        registerReceiver(homeReceiver, filter)
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
        homeReceiver?.let { unregisterReceiver(it) }
        bubbleManager?.hide()
        bubbleManager = null
        Log.d("FloatingBubbleService", "Service destroyed")
    }
}