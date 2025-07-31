#!/bin/bash

PROJECT_NAME="my-personal-site-vibed"
mkdir -p $PROJECT_NAME/{styles,scripts,assets}

cd $PROJECT_NAME

# --- index.html (about) ---
cat <<EOF > index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tal Kachman</title>
  <link rel="stylesheet" href="styles/style.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</head>
<body>
  <canvas id="bg"></canvas>
  <header>
    <div class="name">Tal Kachman</div>
    <nav>
      <a href="index.html">About</a>
      <a href="social.html">Social</a>
      <a href="travel.html">Travel</a>
      <a href="blog.html">Blog</a>
    </nav>
  </header>
  <main>
    <h1>Hello, I'm Tal</h1>
    <p>I’m a human, researcher, and explorer. Welcome to my personal site.</p>
  </main>
  <script src="scripts/network.js"></script>
</body>
</html>
EOF

# --- social.html ---
cat <<EOF > social.html
<!DOCTYPE html>
<html>
<head>
  <title>Social & Links</title>
  <link rel="stylesheet" href="styles/style.css">
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</head>
<body>
  <canvas id="bg"></canvas>
  <header>
    <div class="name">Tal Kachman</div>
    <nav>
      <a href="index.html">About</a>
      <a href="social.html">Social</a>
      <a href="travel.html">Travel</a>
      <a href="blog.html">Blog</a>
    </nav>
  </header>
  <main>
    <h1>Connect with me</h1>
    <ul class="social-icons">
      <li><a href="https://twitter.com/yourhandle" target="_blank"><i class="fab fa-twitter"></i> Twitter</a></li>
      <li><a href="https://bsky.app/profile/yourhandle.bsky.social" target="_blank"><i class="fas fa-cloud"></i> Bluesky</a></li>
      <li><a href="https://github.com/yourhandle" target="_blank"><i class="fab fa-github"></i> GitHub</a></li>
      <li><a href="https://scholar.google.com/citations?user=yourID" target="_blank"><i class="fas fa-graduation-cap"></i> Google Scholar</a></li>
      <li><a href="https://orcid.org/yourID" target="_blank"><i class="fas fa-id-card"></i> ORCID</a></li>
      <li><a href="https://lichess.org/@/yourhandle" target="_blank"><i class="fas fa-chess-knight"></i> Lichess</a></li>
      <li><a href="https://linkedin.com/in/yourhandle" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
    </ul>
  </main>
  <script src="scripts/network.js"></script>
</body>
</html>
EOF

# --- travel.html ---
cat <<EOF > travel.html
<!DOCTYPE html>
<html>
<head>
  <title>Travel / Photography</title>
  <link rel="stylesheet" href="styles/style.css">
</head>
<body>
  <canvas id="bg"></canvas>
  <header>
    <div class="name">Tal Kachman</div>
    <nav>
      <a href="index.html">About</a>
      <a href="social.html">Social</a>
      <a href="travel.html">Travel</a>
      <a href="blog.html">Blog</a>
    </nav>
  </header>
  <main>
    <h1>Travel / Photography</h1>
    <p>Coming soon: a gallery of images, places, and moments.</p>
  </main>
  <script src="scripts/network.js"></script>
</body>
</html>
EOF

# --- blog.html ---
cat <<EOF > blog.html
<!DOCTYPE html>
<html>
<head>
  <title>Blog</title>
  <link rel="stylesheet" href="styles/style.css">
</head>
<body>
  <canvas id="bg"></canvas>
  <header>
    <div class="name">Tal Kachman</div>
    <nav>
      <a href="index.html">About</a>
      <a href="social.html">Social</a>
      <a href="travel.html">Travel</a>
      <a href="blog.html">Blog</a>
    </nav>
  </header>
  <main>
    <h1>Blog</h1>
    <p>Thoughts, notes, and writing. Stay tuned.</p>
  </main>
  <script src="scripts/network.js"></script>
</body>
</html>
EOF

# --- styles/style.css ---
cat <<EOF > styles/style.css
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: black;
  color: white;
  height: 100%;
  overflow: hidden;
}

canvas#bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}

header {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 2rem;
  width: 100%;
}

.name {
  font-size: 1.2rem;
  font-weight: 500;
}

nav a {
  color: white;
  text-decoration: none;
  margin-left: 1.5rem;
  font-size: 1rem;
  transition: opacity 0.2s ease;
}

nav a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

main {
  position: relative;
  z-index: 1;
  padding: 3rem 2rem;
  max-width: 800px;
}

.social-icons {
  list-style: none;
  padding: 0;
}

.social-icons li {
  margin: 0.75rem 0;
  font-size: 1.1rem;
}

.social-icons a {
  color: white;
  text-decoration: none;
}

.social-icons i {
  margin-right: 0.5rem;
}
EOF

# --- scripts/network.js ---
cat <<EOF > scripts/network.js
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nodes = [];
const nodeCount = 100;
for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      let dx = nodes[i].x - nodes[j].x;
      let dy = nodes[i].y - nodes[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.strokeStyle = "rgba(255, 255, 255, " + (1 - dist / 100) + ")";
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  for (let node of nodes) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
  }

  requestAnimationFrame(draw);
}
draw();
EOF

echo "✅ Site generated in ./$PROJECT_NAME"
echo "👉 Run: cd $PROJECT_NAME && python3 -m http.server 8000"
