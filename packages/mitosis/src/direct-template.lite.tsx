import { onMount, onUnMount, useRef, useStore } from '@builder.io/mitosis';

export type EmbedDirectTemplateProps = {
  className?: string;
  host?: string;
  token: string;
  externalId?: string;

  // @src: /apps/web/src/app/embed/direct/[[...url]]/schema
  css?: string | undefined;
  cssVars?: Record<string, string> | undefined;

  email?: string | undefined;
  lockEmail?: boolean | undefined;
  name?: string | undefined;
  lockName?: boolean | undefined;

  onDocumentReady?: () => void;
  onDocumentCompleted?: (data: { token: string; documentId: number; recipientId: number }) => void;
  onDocumentError?: (error: string) => void;
  onFieldSigned?: () => void;
  onFieldUnsigned?: () => void;
};

export default function EmbedDirectTemplate(props: EmbedDirectTemplateProps) {
  const __iframe = useRef<HTMLIFrameElement>(null);

  const state = useStore({
    get src() {
      const appHost = props.host || 'https://imza.devsolux.cloud';

      const encodedOptions = btoa(
        JSON.stringify({
          name: props.name,
          lockName: props.lockName,
          email: props.email,
          lockEmail: props.lockEmail,
          css: props.css,
        }),
      );

      const srcUrl = new URL(`/embed/direct/${props.token}`, appHost);

      if (props.externalId) {
        srcUrl.searchParams.set('externalId', props.externalId);
      }

      return `${srcUrl}#${encodedOptions}`;
    },

    handleMessage(event: MessageEvent) {
      if (__iframe?.contentWindow === event.source) {
        switch (event.data.action) {
          case 'document-ready':
            props.onDocumentReady?.();
            break;

          case 'document-completed':
            props.onDocumentCompleted?.(event.data.data);
            break;

          case 'document-error':
            props.onDocumentError?.(event.data.data);
            break;

          case 'field-signed':
            props.onFieldSigned?.();
            break;

          case 'field-unsigned':
            props.onFieldUnsigned?.();
            break;
        }
      }
    },
  });

  onMount(() => {
    window.addEventListener('message', state.handleMessage);
  });

  onUnMount(() => {
    window.removeEventListener('message', state.handleMessage);
  });

  return <iframe ref={__iframe} class={props.className} src={state.src}></iframe>;
}