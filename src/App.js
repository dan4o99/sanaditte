import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Load documents from localStorage on component mount
  useEffect(() => {
    const savedDocuments = localStorage.getItem('htmlDocuments');
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  }, []);

  // Save documents to localStorage whenever documents change
  useEffect(() => {
    localStorage.setItem('htmlDocuments', JSON.stringify(documents));
  }, [documents]);

  const createDocument = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content fields.');
      return;
    }

    const newDocument = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      preview: content.trim().substring(0, 100) + (content.trim().length > 100 ? '...' : '')
    };

    setDocuments(prev => [newDocument, ...prev]);
    setTitle('');
    setContent('');
    setSuccessMessage('Document created successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (document) => {
    setSelectedDocument(document);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
  };

  const deleteDocument = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      closeModal();
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>HTML Document Manager</h1>
        <p>Create, store, and search your HTML documents with ease</p>
      </header>

      <div className="main-content">
        {/* Create Document Form */}
        <div className="card">
          <h2>📝 Create New Document</h2>
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
          <form onSubmit={createDocument}>
            <div className="form-group">
              <label htmlFor="title">Document Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">HTML Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your HTML content here..."
                required
              />
            </div>
            <button type="submit" className="btn">
              Create Document
            </button>
          </form>
        </div>

        {/* Search Documents */}
        <div className="card">
          <h2>🔍 Search Documents</h2>
          <div className="search-input">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents by title or content..."
            />
          </div>
          <div className="documents-list">
            {filteredDocuments.length === 0 ? (
              <div className="no-documents">
                {documents.length === 0 
                  ? "No documents created yet. Create your first document!" 
                  : "No documents match your search."}
              </div>
            ) : (
              filteredDocuments.map(doc => (
                <div 
                  key={doc.id} 
                  className="document-item"
                  onClick={() => openModal(doc)}
                >
                  <div className="document-title">{doc.title}</div>
                  <div className="document-preview">{doc.preview}</div>
                  <div className="document-date">
                    Created: {new Date(doc.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* All Documents */}
      <div className="documents-grid">
        <h2>📚 All Documents ({documents.length})</h2>
        <div className="documents-list">
          {documents.length === 0 ? (
            <div className="no-documents">
              No documents created yet. Create your first document above!
            </div>
          ) : (
            documents.map(doc => (
              <div 
                key={doc.id} 
                className="document-item"
                onClick={() => openModal(doc)}
              >
                <div className="document-title">{doc.title}</div>
                <div className="document-preview">{doc.preview}</div>
                <div className="document-date">
                  Created: {new Date(doc.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Document Modal */}
      {showModal && selectedDocument && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{selectedDocument.title}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-content">
              <h4>HTML Preview:</h4>
              <div 
                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  backgroundColor: '#f9f9f9'
                }}
                dangerouslySetInnerHTML={{__html: selectedDocument.content}}
              />
              <h4>Raw HTML:</h4>
              <pre 
                style={{
                  background: '#f4f4f4',
                  padding: '15px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}
              >
                {selectedDocument.content}
              </pre>
              <div style={{marginTop: '20px', textAlign: 'center'}}>
                <button 
                  className="btn" 
                  onClick={() => deleteDocument(selectedDocument.id)}
                  style={{background: '#dc3545', width: 'auto', padding: '10px 20px'}}
                >
                  Delete Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;