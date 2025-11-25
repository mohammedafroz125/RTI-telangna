/**
 * PDF Download Routes
 * Handles PDF file serving and download tracking
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const logger = require('../utils/logger');

// Path to PDF directory (adjust based on your deployment structure)
const PDF_BASE_PATH = path.join(__dirname, '../../Frontend/src/assets/PDF');

/**
 * GET /api/v1/pdf/:state/:category/:filename
 * Serve PDF file for download
 * Supports both delhi and telangana states
 */
router.get('/:state/:category/:filename', async (req, res) => {
  try {
    const { state, category, filename } = req.params;

    // Sanitize inputs to prevent path traversal
    const safeState = path.basename(state);
    const safeCategory = path.basename(category);
    const safeFilename = path.basename(filename);

    // Validate state (only allow delhi or telangana)
    if (safeState !== 'delhi' && safeState !== 'telangana') {
      return res.status(400).json({
        success: false,
        message: 'Invalid state. Only "delhi" and "telangana" are supported.',
      });
    }

    // Construct file path
    const filePath = path.join(PDF_BASE_PATH, safeState, safeCategory, safeFilename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      logger.warn(`PDF not found: ${filePath}`);
      return res.status(404).json({
        success: false,
        message: 'PDF file not found',
      });
    }

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);

    // Stream the file
    const fileStream = require('fs').createReadStream(filePath);
    fileStream.pipe(res);

    logger.info(`PDF served: ${safeState}/${safeCategory}/${safeFilename}`);
  } catch (error) {
    logger.error('Error serving PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Error serving PDF file',
    });
  }
});

/**
 * POST /api/v1/pdf-downloads
 * Track PDF downloads (user information)
 */
router.post('/pdf-downloads', async (req, res) => {
  try {
    const { name, email, phone, department, downloadedAt } = req.body;

    // Log the download (you can also save to database if needed)
    logger.info('PDF Download tracked:', {
      name,
      email,
      phone,
      department,
      downloadedAt,
      ip: req.ip,
    });

    // TODO: Save to database if you want to track downloads
    // const db = require('../config/database');
    // await db.query('INSERT INTO pdf_downloads ...');

    res.status(200).json({
      success: true,
      message: 'Download tracked successfully',
    });
  } catch (error) {
    logger.error('Error tracking PDF download:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking download',
    });
  }
});

module.exports = router;

