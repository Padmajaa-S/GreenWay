import pickle
from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import io

app = Flask(__name__)

# Load the model
with open('/home/project/return_verification_model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/api/verify-return', methods=['POST'])
def verify_return():
    try:
        # Get user ID and image from request
        user_id = request.form.get('user_id')
        image_file = request.files.get('image')
        
        if not user_id or not image_file:
            return jsonify({'error': 'Missing required data'}), 400

        # Process the image
        image = Image.open(image_file)
        # Convert image to format expected by model
        image = image.resize((224, 224))  # Adjust size as needed
        image_array = np.array(image)
        
        # Make prediction
        prediction = model.predict([[user_id, image_array]])
        
        # Return result
        return jsonify({
            'verified': bool(prediction[0]),
            'confidence': float(prediction[1]) if len(prediction) > 1 else None
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)