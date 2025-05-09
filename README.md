# La Bella Serata - Site Web d'Invitation

Un site web élégant et immersif pour une soirée privée inspirée de l'Italie des années 60.

## Structure du Projet

```
la-bella-serata/
├── index.html
├── styles.css
├── main.js
├── README.md
└── assets/
    ├── hero-bg.png
    ├── ambient.mp3
    └── gallery/
        ├── 1.jpg
        ├── 2.jpg
        ├── 3.jpg
        ├── 4.jpg
        ├── 5.jpg
        └── 6.jpg
```

## Configuration Requise

1. **Images**
   - Ajoutez une image de fond pour la section héro dans `assets/hero-bg.png`
   - Ajoutez 6 images pour la galerie dans le dossier `assets/gallery/`
   - Les images doivent être optimisées pour le web (format PNG, JPG ou WebP recommandé)

2. **Audio**
   - Ajoutez un fichier audio d'ambiance dans `assets/ambient.mp3`
   - Format recommandé : MP3, 128-192kbps

3. **Formulaire RSVP**
   - Remplacez `YOUR_FORM_ENDPOINT` dans `main.js` par l'URL de votre endpoint de formulaire
   - Options recommandées : Formspree, EmailJS, ou votre propre backend

## Fonctionnalités

- Design responsive avec animations fluides
- Effet parallax sur la section héro
- Galerie d'images avec effet Masonry
- Formulaire RSVP interactif
- Lecteur audio d'ambiance
- Animations au scroll avec GSAP
- Menu mobile adaptatif

## Technologies Utilisées

- HTML5
- CSS3 (avec variables CSS)
- JavaScript (ES6+)
- GSAP pour les animations
- Font Awesome pour les icônes
- Google Fonts pour la typographie

## Installation

1. Clonez le repository
2. Ajoutez vos ressources (images, audio) dans les dossiers appropriés
3. Configurez le endpoint du formulaire RSVP
4. Ouvrez `index.html` dans votre navigateur

## Personnalisation

### Couleurs
Les couleurs principales sont définies dans `styles.css` sous forme de variables CSS :
```css
:root {
    --color-cream: #F5F5DC;
    --color-terracotta: #E2725B;
    --color-lemon: #FFF68F;
    --color-olive: #556B2F;
    --color-text: #2C1810;
}
```

### Typographie
Les polices utilisées sont :
- Titres : Playfair Display
- Corps de texte : Source Serif Pro

## Compatibilité

- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)
- Mobile : iOS Safari, Android Chrome

## Support

Pour toute question ou problème, veuillez créer une issue dans le repository. 