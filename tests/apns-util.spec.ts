import * as path from 'path';
import * as fs from 'fs';

import { ApnsCertificate } from '../src';
import {
  InvalidPassphraseError,
  InvalidFileError,
  InvalidPrivateKeyError,
  InvalidCertificateEnvError
} from '../src/lib/apple/errors';

function readFileAsBase64 (filename: string) {
  const filepath = path.join(__dirname, 'certificates', filename);

  return fs.readFileSync(filepath).toString('base64');
}

test('valid APNS development certificate', () => {
  const cert = new ApnsCertificate(readFileAsBase64('apns_dev_push.p12'));
  expect(cert.key).toBeDefined();
  expect(cert.cert).toBeDefined();
  expect(cert.passphrase).toBeUndefined();
  expect(cert.expires).toBeInstanceOf(Date);
  expect(cert.environment.production).toEqual(false);
  expect(cert.environment.sandbox).toEqual(true);
});

test('valid APNS production certificate', () => {
  const cert = new ApnsCertificate(readFileAsBase64('apns_prod_push.p12'));
  expect(cert.key).toBeDefined();
  expect(cert.cert).toBeDefined();
  expect(cert.passphrase).toBeUndefined();
  expect(cert.expires).toBeInstanceOf(Date);
  expect(cert.environment.production).toEqual(true);
  expect(cert.environment.sandbox).toEqual(true);
});

test('expired APNS certificate', () => {
  const cert = new ApnsCertificate(readFileAsBase64('apns_prod_push.p12'));
  expect(cert.expires).toBeInstanceOf(Date);
  expect(cert.expires.getTime()).toBeLessThan(Date.now());
});

test('password protected APNS certificate with correct password', () => {
  const file = readFileAsBase64('apns_password_protected.p12');
  const pwd = 'oggabugga';
  const cert = new ApnsCertificate(file, pwd);
  expect(cert.key).toBeDefined();
  expect(cert.cert).toBeDefined();
  expect(cert.passphrase).toEqual(pwd);
  expect(cert.expires).toBeInstanceOf(Date);
});

test('password protected APNS certificate with incorrect password', () => {
  expect(() =>
    new ApnsCertificate(readFileAsBase64('apns_password_protected.p12'))
  ).toThrowError(InvalidPassphraseError);
});

test('OpenSSL empty password APNS certificate', () => {
  const cert = new ApnsCertificate(readFileAsBase64('openssl_empty_pwd.p12'));
  expect(cert.key).toBeDefined();
  expect(cert.cert).toBeDefined();
});

test('OpenSSL empty password protected APNS certificate', () => {
  expect(() =>
    new ApnsCertificate(readFileAsBase64('openssl_empty_pwd.p12'), '1234')
  ).toThrowError(InvalidPassphraseError);
});

test('incorrect (apple but not APNS) certificate', () => {
  expect(() =>
    new ApnsCertificate(readFileAsBase64('not_apns_but_apple.p12'))
  ).toThrowError(InvalidCertificateEnvError);
});

test('incorrect (self signed) certificate', () => {
  expect(() =>
    new ApnsCertificate(readFileAsBase64('not_apple.p12'))
  ).toThrowError(InvalidPrivateKeyError);
});

test('incorrect file format', () => {
  expect(() =>
    new ApnsCertificate(readFileAsBase64('dummy.txt'))
  ).toThrowError(InvalidFileError);
});
