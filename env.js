(function() {
    const env = {};
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '.env', false);
        xhr.send(null);
        if (xhr.status === 200 || xhr.status === 0) {
            xhr.responseText.split(/\r?\n/).forEach(line => {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#')) return;
                const [key, ...rest] = trimmed.split('=');
                if (!key) return;
                env[key.trim()] = rest.join('=').trim();
            });
        }
    } catch (error) {
        console.error('Não foi possível carregar o arquivo .env', error);
    }
    window.env = env;
})();
