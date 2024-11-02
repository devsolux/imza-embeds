import register from 'preact-custom-element';

import { EmbedDirectTemplate, EmbedSignDocument } from '@devsolux/imza-embed-preact';

register(EmbedDirectTemplate, 'devsolux-imza-embed-direct-template', [
  'token',
  'host',
  'externalId',
  'css',
  'email',
  'lockEmail',
  'name',
  'lockName',
  'onDocumentReady',
  'onDocumentCompleted',
  'onDocumentError',
]);

register(EmbedSignDocument, 'devsolux-imza-embed-sign-document', [
  'token',
  'host',
  'css',
  'name',
  'lockName',
  'onDocumentReady',
  'onDocumentCompleted',
  'onDocumentError',
]);
