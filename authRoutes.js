// This would typically be stored in a database
const users = [];

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    if (users.some(user => user.username === username)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user in the "database"
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the "database"
    const user = users.find(user => user.username === username);

    // User not found
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Incorrect password
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

// Middleware for token authentication
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  jwt.verify(token, 'secret', (error, user) => {
    if (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}
