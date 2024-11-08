export  function useSSE() {
  function onListenSSEMessage(
    url: string | URL,
    options: EventSourceInit,
    callBacks?: {
      onopen?: (data: any) => any;
      onerror?: (data: any) => any;
      onmessage?: (data: any) => any;
    }
  ) {
    const eventSource = new EventSource(url, options);
    eventSource.onopen = (callBacks && callBacks.onopen) || null;
    eventSource.onerror = (callBacks && callBacks.onerror) || null;
    eventSource.onmessage = (callBacks && callBacks.onmessage) || null;
  }

  return {
    onListenSSEMessage
  }
}
