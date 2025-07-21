import React, { useState, useEffect } from 'react';
import '../../CSS/CompanyWizard.css';
import 'animate.css';
import { getAllCategories } from '../../Services/Category';
import { createCompany } from '../../Services/Company';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import {
  Card,
  CardContent,
  Container,
  useTheme,
} from '@mui/material';

const CompanyWizard = () => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    customCategory: '',
    wallet: '',
    location: '',
    email: '',
    phoneNumber: '',
    bitrixID: '',
    companyOrIndividual: '',
    imageUrl: null,
    commercialRegister: '',
    commercialRegisterImageURl: null,
    ownerID: '',
    ownerIDImageUrl: null,
    taxCard: '',
    taxCardImageUrl: null,
    promissoryNote: null,
    description: ''
  });

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      if (name === 'category') {
        setShowCustomCategory(value.toLowerCase() === 'other' || value === 'أخري');
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isCompany = formData.companyOrIndividual === 'Company';

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isCompany = formData.companyOrIndividual === 'Company';

    const requiredFields = [
      'name', 'category', 'location', 'email',
      'phoneNumber', 'bitrixID', 'companyOrIndividual', 'imageUrl'
    ];

    if (isCompany) {
      requiredFields.push(
        'commercialRegister', 'commercialRegisterImageURl',
        'ownerID', 'ownerIDImageUrl',
        'taxCard', 'taxCardImageUrl',
        'promissoryNote'
      );
    }

    const missing = requiredFields.filter(field => !formData[field]);
    if (missing.length > 0) {
      alert(`Please fill the following required fields: ${missing.join(', ')}`);
      return;
    }

    const finalData = new FormData();

    // Append fields
    finalData.append('name', formData.name);
    finalData.append('category', showCustomCategory ? formData.customCategory : formData.category);
    finalData.append('wallet', formData.wallet || '');
    finalData.append('location', formData.location);
    finalData.append('email', formData.email);
    finalData.append('phoneNumber', formData.phoneNumber);
    finalData.append('bitrixID', formData.bitrixID);
    finalData.append('companyOrIndividual', isCompany ? 'true' : 'false');
    finalData.append('description', formData.description || '');
    finalData.append('commercialRegister', formData.commercialRegister || '');
    finalData.append('ownerID', formData.ownerID || '');
    finalData.append('taxCard', formData.taxCard || '');

    // Append files (descriptive names used for backend mapping)
    const appendFile = (key, file) => {
      if (file) {
        const renamedFile = new File([file], key + file.name.substring(file.name.lastIndexOf('.')), {
          type: file.type
        });
        finalData.append('files', renamedFile);
      }
    };

    appendFile('image', formData.imageUrl);
    appendFile('commercial_register', formData.commercialRegisterImageURl);
    appendFile('owner_id', formData.ownerIDImageUrl);
    appendFile('tax_card', formData.taxCardImageUrl);
    appendFile('promissory_note', formData.promissoryNote);

    setSubmitting(true);
    try {
      await createCompany(finalData);
      setToastMessage('Company created successfully!');
      setToastVariant('success');
      setShowToast(true);
      localStorage.setItem('CompanyCreated', 'true');
      navigate('/Company');
    } catch (error) {
      console.error('Submission error:', error.response?.data || error.message);
      setToastMessage('Error creating company.');
      setToastVariant('danger');
      setShowToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Card sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, borderRadius: 2, boxShadow: 3, marginBottom: 3 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="container mt-5">
                <div className="progress px-1 mb-4">
                    <div className="progress-bar" role="progressbar" style={{ width: `${((currentStep - 1) / 3) * 100}%` }} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="step-container d-flex justify-content-between mb-4 text-black">
                    {[1, 2, 3, 4].map(step => (
                        <div
                            key={step}
                            className={`step-circle${currentStep === step ? ' active' : ''}${step < currentStep ? ' completed' : ''}`}
                            onClick={() => setCurrentStep(step)}
                        >
                            {step}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} id="multi-step-form">
            {currentStep === 1 && <StepOne formData={formData} handleInputChange={handleInputChange} />}
            {currentStep === 2 && <StepTwo formData={formData} handleInputChange={handleInputChange} showCustomCategory={showCustomCategory} categories={categories} />}
            {currentStep === 3 && isCompany && <StepThreeCompany formData={formData} handleInputChange={handleInputChange} />}
            {currentStep === 4 && <StepFour formData={formData} handleInputChange={handleInputChange} />}
            <div className="form-navigation mt-4 d-flex justify-content-between">
              {currentStep > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous</button>}
              {currentStep < 4 && <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>}
              {currentStep === 4 && <button type="submit" className="btn btn-success" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>}
            </div>
          </form>
            </div>
        </CardContent>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} bg={toastVariant} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

const StepOne = ({ formData, handleInputChange }) => (
  <div className="step animate__animated animate__fadeInRight">
    <h4>Step 1 - Type</h4>
    <div className="form-group">
      <label>Company or Individual <span className="text-danger">*</span></label>
      <select className="form-select" name="companyOrIndividual" value={formData.companyOrIndividual} onChange={handleInputChange}>
        <option value="">Select Type</option>
        <option value="Company">Company</option>
        <option value="Individual">Individual</option>
      </select>
    </div>
  </div>
);

const StepTwo = ({ formData, handleInputChange, showCustomCategory, categories }) => (
  <div className="step animate__animated animate__fadeInRight">
    <h4>Step 2 - General Info</h4>
    <div className="row">
      <div className="col-md-6 mb-3">
        <label>Name <span className="text-danger">*</span></label>
        <input type="text" className="form-control" name="name" value={formData.name} placeholder='Please Enter Your Name' onChange={handleInputChange} />
      </div>
      <div className="col-md-6 mb-3">
        <label>Category <span className="text-danger">*</span></label>
        <select className="form-select" name="category" value={formData.category} onChange={handleInputChange}>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat.Id} value={cat.Name}>{cat.Name}</option>)}
          <option value="أخري">أخري</option>
        </select>
      </div>
      {showCustomCategory && (
        <div className="col-md-6 mb-3">
          <label>Custom Category</label>
          <input type="text" className="form-control" name="customCategory" value={formData.customCategory} placeholder='Please Enter Category' onChange={handleInputChange} />
        </div>
      )}
      <div className="col-md-6 mb-3">
        <label>Location <span className="text-danger">*</span></label>
        <input type="text" className="form-control" name="location" value={formData.location} placeholder='Please Enter Location' onChange={handleInputChange} />
      </div>
      <div className="col-md-6 mb-3">
        <label>Email <span className="text-danger">*</span></label>
        <input type="email" className="form-control" name="email" value={formData.email} placeholder='Please Enter Email' onChange={handleInputChange} />
      </div>
      <div className="col-md-6 mb-3">
        <label>Phone Number <span className="text-danger">*</span></label>
        <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} placeholder='Please Enter PhoneNumber' onChange={handleInputChange} />
      </div>
      <div className="col-md-6 mb-3">
        <label>Bitrix ID <span className="text-danger">*</span></label>
        <input type="text" className="form-control" name="bitrixID" value={formData.bitrixID} placeholder='Please Enter BitrixID' onChange={handleInputChange} />
      </div>
    </div>
  </div>
);

const StepThreeCompany = ({ formData, handleInputChange }) => (
  <div className="step animate__animated animate__fadeInRight">
    <h4>Step 3 - Company Requirements</h4>
    <div className="row">
      <div className="col-md-6 mb-3">
        <label>Commercial Register</label>
        <input type="text" className="form-control" name="commercialRegister" value={formData.commercialRegister} placeholder='Please Enter Commercial Register' onChange={handleInputChange} />
      </div>
      <div className="col-md-6 mb-3">
        <label>Commercial Register Document</label>
        <input type="file" className="form-control" name="commercialRegisterImageURl" onChange={handleInputChange} placeholder='Please Enter Commercial Register Document' />
      </div>
      <div className="col-md-6 mb-3">
        <label>Owner ID</label>
        <input type="text" className="form-control" name="ownerID" value={formData.ownerID} onChange={handleInputChange} placeholder='Please Enter OwnerID' />
      </div>
      <div className="col-md-6 mb-3">
        <label>Owner ID Document</label>
        <input type="file" className="form-control" name="ownerIDImageUrl" onChange={handleInputChange} />
      </div>
      <div className="col-md-6 mb-3">
        <label>Tax Card</label>
        <input type="text" className="form-control" name="taxCard" value={formData.taxCard} onChange={handleInputChange} placeholder='Please Tax Card' />
      </div>
      <div className="col-md-6 mb-3">
        <label>Tax Card Document</label>
        <input type="file" className="form-control" name="taxCardImageUrl" onChange={handleInputChange} />
      </div>
      <div className="col-md-6 mb-3">
        <label>Promissory Note</label>
        <input type="file" className="form-control" name="promissoryNote" onChange={handleInputChange} placeholder='Please Enter Promissory Note' />
      </div>
    </div>
  </div>
);

const StepFour = ({ formData, handleInputChange }) => {
  const handleDescriptionChange = (value) => {
    handleInputChange({ target: { name: 'description', value } });
  };

  return (
    <div className="step animate__animated animate__fadeInRight">
      <h4>Step 4 - Image & Description</h4>
      <div className="mb-3">
        <label>Image <span className="text-danger">*</span></label>
        <input type="file" className="form-control" name="imageUrl" onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label>Description</label>
        <ReactQuill
          theme="snow"
          value={formData.description}
          onChange={handleDescriptionChange}
          placeholder="Please enter description"
          className="bg-white text-black"
          style={{
            height: 'auto',
            marginBottom: '20px',
          }}
        />
      </div>
    </div>
  );

};

export default CompanyWizard;