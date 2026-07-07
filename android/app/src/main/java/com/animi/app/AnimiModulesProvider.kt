package com.animi.app

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.ModulesProvider

class AnimiModulesProvider : ModulesProvider {
  override fun getModulesList(): List<Class<out Module>> {
    return emptyList()
  }
}