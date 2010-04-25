package com.lightrail.snapost;

import org.appcelerator.titanium.TiApplication;

public class SnapostApplication extends TiApplication {

	@Override
	public void onCreate() {
		super.onCreate();
		
		appInfo = new SnapostAppInfo(this);
	}
}
