#!/bin/bash

PROJECT_NAME="my-personal-site"

# Create folders
mkdir -p $PROJECT_NAME/{styles,scripts,assets}

cd $PROJECT_NAME

# index.html
cat <<EOF > index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Name</title>
  <link rel="stylesheet" href="styles/style.css" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
  <canvas id="bg"></canvas>
  <main>
    <h1>Your Name</h1>
    <nav>
      <a href="blog.html">Blog</a>
      <a href="links.html">Links</a>
      <a href="about.html">About</a>
    </nav>
  </main>
  <script src="scripts/network.js"></script>
</body>
</html>
EOF

# CSS
cat <<EOF > styles/style.css
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  color: white;
  background-color: black;
}

canvas#bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

main {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  top: 40%;
  transform: translateY(-50%);
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

nav a:hover {
  text-decoration: underline;
}
EOF

# JavaScript animation
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

# Subpages
for page in blog links about; do
cat <<EOF > $page.html
<!DOCTYPE html>
<html>
<head>
  <title>${page^}</title>
  <link rel="stylesheet" href="styles/style.css">
</head>
<body>
  <main>
    <h1>${page^}</h1>
    <p>Coming soon...</p>
  </main>
</body>
</html>
EOF
done

echo "✅ Static site created in '$PROJECT_NAME'."
echo "👉 To preview: cd $PROJECT_NAME && python3 -m http.server 8000"
