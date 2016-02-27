package com.venmo_app;

import com.facebook.react.ReactActivity;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.magus.fblogin.FacebookLoginPackage;

import ca.jaysoo.extradimensions.ExtraDimensionsPackage;

import com.surialabs.rn.braintree.BraintreePackage;
import android.content.Intent;

public class MainActivity extends ReactActivity {
    private BraintreePackage mBraintreePackage;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "venmo_app";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      mBraintreePackage = new BraintreePackage(this);
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new VectorIconsPackage(),
          new FacebookLoginPackage(),
          new ExtraDimensionsPackage(this),
          mBraintreePackage
        );
    }

    /**
     * For Braintree
     */
    @Override
    public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
      super.onActivityResult(requestCode, resultCode, data);

      mBraintreePackage.handleActivityResult(requestCode, resultCode, data);
    }
}
