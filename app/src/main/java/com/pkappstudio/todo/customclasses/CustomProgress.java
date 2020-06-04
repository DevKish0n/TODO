package com.pkappstudio.todo.customclasses;

import android.app.Activity;
import android.app.Dialog;
import android.view.Window;

import com.pkappstudio.todo.R;

public class CustomProgress {
    private Activity activity;
    private Dialog mDialog;

    public CustomProgress(Activity mActivity){
        this.activity = mActivity;
    }


    public void startProgress(){
        mDialog = new Dialog(activity);
        mDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        mDialog.setCancelable(false);
        mDialog.setContentView(R.layout.custom_progress);

        mDialog.show();
    }

    public void stopProgress(){
        mDialog.dismiss();
    }
}
