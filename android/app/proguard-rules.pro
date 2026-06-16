# Add project specific ProGuard rules here.

-keep class com.mkt.studentportal.BuildConfig { *; }

# React Native
-keep class com.facebook.react.bridge.CatalystInstanceImpl { *; }
-keep class com.facebook.react.bridge.WritableNativeMap { *; }
-keep class com.facebook.react.bridge.ReadableNativeMap { *; }
-keep class com.facebook.react.bridge.WritableNativeArray { *; }
-keep class com.facebook.react.bridge.ReadableNativeArray { *; }
-keep class com.facebook.react.views.text.TextInlineViewPlaceholderSpan { *; }
-keep class com.facebook.react.views.text.CustomLineHeightSpan { *; }
-keep class com.facebook.yoga.** { *; }
-keep class com.facebook.stacktrace.** { *; }
-keep class com.facebook.infer.annotation.** { *; }
-keep class com.facebook.common.logging.** { *; }

# Reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep interface com.swmansion.reanimated.** { *; }

# Firebase
-keep class com.google.firebase.** { *; }

# Webkit
-keep class androidx.webkit.** { *; }

# OKHttp
-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# Gson / JSON parsing if used
-keep class com.google.gson.** { *; }

# General
-dontwarn com.facebook.react.**
-dontwarn javax.annotation.**
