document.addEventListener('DOMContentLoaded', () => {
    const evt = new CustomEvent('apod-init', {'detail': {
        elem: '#app'
    }});

    document.dispatchEvent(evt);
});