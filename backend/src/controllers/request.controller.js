import CustomRequest from '../models/request.model.js';

// @desc    Submit a new contact request
// @route   POST /api/requests
// @access  Public
export const createRequest = async (req, res) => {
  const { name, email, phone, budget, description } = req.body;

  try {
    const newRequest = new CustomRequest({
      name,
      email,
      phone,
      budget,
      description,
    });

    const createdRequest = await newRequest.save();
    res.status(201).json(createdRequest);
  } catch (error) {
    res.status(400).json({ message: 'Invalid request data', error: error.message });
  }
};

// @desc    Get all requests
// @route   GET /api/requests
// @access  Private/Admin
export const getRequests = async (req, res) => {
  try {
    const requests = await CustomRequest.find({}).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update request status
// @route   PUT /api/requests/:id
// @access  Private/Admin
export const updateRequestStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const request = await CustomRequest.findById(req.params.id);
    
    if (request) {
      request.status = status;
      const updatedRequest = await request.save();
      res.json(updatedRequest);
    } else {
      res.status(404).json({ message: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
