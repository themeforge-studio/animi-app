package expo.modules.floatingavatar

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class FloatingAvatarModule : Module() {

  private var bubbleManager: FloatingBubbleManager? = null
  private var lastAvatarUrl: String = ""

  override fun definition() = ModuleDefinition {
    Name("FloatingAvatar")

    AsyncFunction("showAvatar") { avatarUrl: String ->
      val context = appContext.reactContext ?: throw Exception("Context not available")
      
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && 
          !Settings.canDrawOverlays(context)) {
        val intent = Intent(
          Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
          Uri.parse("package:${context.packageName}")
        )
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        context.startActivity(intent)
        throw Exception("PERMISSION_DENIED")
      }

      lastAvatarUrl = avatarUrl

      val serviceIntent = Intent(context, FloatingBubbleService::class.java).apply {
        putExtra("avatarUrl", avatarUrl)
      }

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        context.startForegroundService(serviceIntent)
      } else {
        context.startService(serviceIntent)
      }
    }

    AsyncFunction("hideAvatar") {
      val context = appContext.reactContext ?: throw Exception("Context not available")
      val serviceIntent = Intent(context, FloatingBubbleService::class.java)
      context.stopService(serviceIntent)
    }

    AsyncFunction("showAvatarOverlay") {
      android.os.Handler(android.os.Looper.getMainLooper()).post {
        bubbleManager?.show(lastAvatarUrl)
      }
    }

    AsyncFunction("hideAvatarOverlay") {
      android.os.Handler(android.os.Looper.getMainLooper()).post {
        bubbleManager?.hide()
      }
    }
  }
}