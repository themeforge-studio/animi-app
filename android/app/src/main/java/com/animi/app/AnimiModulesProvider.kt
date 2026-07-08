package com.animi.app

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.ModulesProvider

class AnimiModulesProvider : ModulesProvider {
  override fun getModulesMap(): Map<Class<out Module>, String?> {
    return emptyMap()
  }
}