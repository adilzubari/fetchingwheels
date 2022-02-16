package com.lughut.fetchingwheels;

import android.os.Bundle; // added by m_adil
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // added by m_adil

public class MainActivity extends ReactActivity {

  @Override
   protected void onCreate(Bundle savedInstanceState) {
       SplashScreen.show(this);  // added by m_adil
       super.onCreate(savedInstanceState);
   }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "fetchingwheels";
  }
} 
