document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('createCallBtn').addEventListener('click', async () => {
      const userId = document.getElementById('userId').value.trim();
      if (!userId) {
        alert('Por favor, ingresa tu ID de docente.');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/create/call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId })
        });

        if (!response.ok) throw new Error('Error al crear la llamada');
        const data = await response.json();

        document.getElementById('callId').textContent = data.call_id;
        const link = `${window.location.origin}/videollamada.html?call_id=${data.call_id}&user_id=${userId}`;
        document.getElementById('callLink').value = link;

        document.getElementById('callResult').style.display = 'block';
      } catch (err) {
        console.error(err);
        alert('❌ No se pudo crear la llamada. Verifica tu conexión o intenta nuevamente.');
      }
    });

    document.getElementById('copyBtn').addEventListener('click', () => {
      const linkInput = document.getElementById('callLink');
      linkInput.select();
      document.execCommand('copy');
      alert('📋 Enlace copiado al portapapeles.');
    });
})
