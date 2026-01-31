# MAF - Model Application Firewall

<div align="center">

![MAF Logo](public/eaglelogoWhite.svg)

### Contextual Security for Modern Applications

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://npmjs.com/package/mafai)
[![Node](https://img.shields.io/badge/node-%3E%3D18-success.svg)](https://nodejs.org/)

[Get Started](#-quick-start) • [Documentation](https://maf-landing-page.vercel.app/docs) • [Ecosystem](#-ecosystem)

</div>

---

## 🔒 Overview

**MAF (Model Application Firewall)** is an intelligent security middleware that brings context, continuity, and intent detection to your application requests. Unlike traditional WAFs that block based on static rules, MAF analyzes user behavior to stop attacks before they execute.

## ✨ Ecosystem

The MAF project consists of three core components working together:

| Component | Description | Repository |
|-----------|-------------|------------|
| **MAF Package** | The core NPM middleware for Node.js/Express. | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SajalRawat/mafai-package) |
| **MAF App** | Full-stack service for managing the middleware. | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SajalRawat/mafai-app) |
| **Self-Hosted** | A self-hostable version of the MAF system. | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jrdevadattan/maf-app) |

## 🚀 Quick Start

Install the middleware package:

```bash
npm install mafai
```

Integrate with your **Express** application:

```javascript
const express = require('express');
const { mafaiExpress } = require('mafai');

const app = express();
app.use(express.json());

// Initialize MAF Middleware
app.use(mafaiExpress({
    apiKey: "YOUR_MAF_APP_KEY",
    engineUrl: "http://your-engine-ip:3001/evaluate"
}));

app.listen(3000, () => console.log('Server protected by MAF'));
```

## 🛠️ Features

- **Context-Aware Analysis**: Understands the *intent* behind requests, not just the payload.
- **Session Continuity**: Tracks user behavior across sessions to detect anomalies.
- **Zero Latency**: Designed for minimal impact on request processing time.
- **Plug-and-Play**: Drop-in middleware for existing Express applications.

## 📚 Research & References

MAF's architecture is built upon cutting-edge research in web security and behavioral analysis.

- **[WAFFLED: Exploiting Parsing Discrepancies to Bypass WAFs](public/references/waffled.pdf)**
  > *Reveals over 1200 unique evasion techniques that bypass top WAFs by exploiting parsing mismatches. MAF's application-layer design eliminates this entire class of vulnerability.*

- **[AI-Powered Behavioral Biometrics for Continuous Authentication](public/references/AI-Powered_Behavioral_Biometrics_for_Continuous_Authentication.pdf)**
  > *Foundational research for our Session Continuity engine, using deep learning to detect session hijacking with high accuracy.*

---

<div align="center">
  <sub>Built with ❤️ by the MAF Team.</sub>
</div>
