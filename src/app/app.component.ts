import { Component, VERSION } from '@angular/core';
import * as speakeasy from 'speakeasy';
import QRCode from 'qrcode';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = '';
  name2 = '';
  status = false;
  secretkey = '';
  mysecret;

  constructor() {}

  getCode() {
    let totp = speakeasy.totp({
      secret: this.secretkey,
      encoding: 'ascii',
    });
    return totp;
  }

  ngOnInit() {
    this.mysecret = speakeasy.generateSecret();
    console.log(this.mysecret);
    this.secretkey = this.mysecret.base32;
    var url = speakeasy.otpauthURL({
      secret: this.secretkey,
      label: 'Forza Delivery',
    });
    this.drawQr(url);
    setInterval(() => {
      this.name2 = this.getCode();
    }, 1000);
  }

  drawQr(url) {
    QRCode.toDataURL(url, function (err, data_url) {
      document.querySelector('#img').innerHTML = '<img src="' + data_url + '">';
    });
  }

  verify() {
    let status = speakeasy.totp.verify({
      secret: this.secretkey,
      encoding: 'ascii',
      token: this.name.toString(),
    });
    console.log(status);
    this.status = status;
  }
}
