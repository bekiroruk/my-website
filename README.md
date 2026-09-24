# Bekir Oruk — Kişisel Web Sitesi

Bilgisayarlı görü, yerel yapay zekâ ve yazılım projelerimi anlattığım kişisel portföy sitesi.

**Canlı site:** https://bekir-oruk.bekiroruk.chatgpt.site

## Proje yapısı

```text
.
├── index.html                 # Sayfa içeriği ve semantik yapı
├── assets/
│   ├── css/styles.css        # Tasarım, animasyon ve duyarlı düzen
│   ├── js/main.js            # Mobil menü etkileşimi
│   └── images/bekir-oruk.jpg # Portre fotoğrafı
└── README.md
```

## Yerelde çalıştırma

Kurulum veya derleme gerekmez. Depo klasöründe aşağıdaki komutu çalıştırın:

```bash
python3 -m http.server 8000
```

Ardından `http://localhost:8000` adresini açın. Dilerseniz `index.html` dosyasını doğrudan tarayıcıda da açabilirsiniz.

## Düzenleme

- Metinler ve proje bağlantıları: `index.html`
- Renkler, tipografi ve mobil görünüm: `assets/css/styles.css`
- Mobil menü davranışı: `assets/js/main.js`
- Portre: `assets/images/bekir-oruk.jpg`

Site statik HTML, CSS ve JavaScript ile geliştirilmiştir. Harici paket veya derleme aracı kullanılmaz. GitHub deposu ve Sites üzerindeki canlı yayın ayrı kaynaklardır; birindeki değişiklik diğerine otomatik geçmez.
