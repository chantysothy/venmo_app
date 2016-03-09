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

import com.microsoft.codepush.react.CodePush;

public class MainActivity extends ReactActivity {
    private BraintreePackage mBraintreePackage;
    private CodePush _codePush;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "venmo_app";
    }

    @Override
    protected String getJSBundleFile() {
      return this._codePush.getBundleUrl("index.android.bundle");
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
      this._codePush = new CodePush("F1Pc_uEtJMIVSUauK1B-xVwoAvwINkl59oS2l", this, BuildConfig.DEBUG);
      mBraintreePackage = new BraintreePackage(this);
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          this._codePush.getReactPackage(),
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
