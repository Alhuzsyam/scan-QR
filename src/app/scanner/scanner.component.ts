import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {
  title = 'Stratscaning';
 // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#front_and_back_camera
 public config: ScannerQRCodeConfig = {
  constraints: {
    video: {
      width: window.innerWidth
    },
  },
  canvasStyles: [
    { /* layer */
      lineWidth: 1,
      fillStyle: '#00950685',
      strokeStyle: '#00950685',
    },
    { /* text */
      font: '17px serif',
      fillStyle: '#ff0000',
      strokeStyle: '#ff0000',
    }
  ],
};


@ViewChild('action') action!: NgxScannerQrcodeComponent;

constructor(private qrcode: NgxScannerQrcodeService) { }

ngAfterViewInit(): void {
  this.action.isReady.subscribe((res: any) => {
    // this.handle(this.action, 'start');
  });
}

public onEvent(e: ScannerQRCodeResult[], action?: any): void {
  console.log(e[0].value);
}

public handle(action: any, fn: string): void {
  const playDeviceFacingBack = (devices: any[]) => {
    // front camera or back camera check here!
    const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
    action.playDevice(device ? device.deviceId : devices[0].deviceId);
  }

  if (fn === 'start') {
    this.title = 'Stopscanning';
    action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
  } else {
    action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    this.title = 'Stratscaning';
  }
}

}
