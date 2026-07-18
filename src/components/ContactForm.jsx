import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ email: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (err) {
      console.error('Error:', err);
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground/80">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-primary/25 bg-[#121212]/85 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none transition-colors duration-200"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-foreground/80">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          className="w-full resize-none rounded-lg border border-primary/25 bg-[#121212]/85 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none transition-colors duration-200"
          placeholder="Your message..."
        ></textarea>
      </div>

      {status === 'success' && (
        <div className="flex items-center space-x-3 rounded-lg border border-emerald-500/35 bg-emerald-500/10 p-4">
          <CheckCircle className="h-5 w-5 text-emerald-400" />
          <span className="text-emerald-300">Message sent successfully. I&apos;ll get back to you soon.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center space-x-3 rounded-lg border border-red-500/35 bg-red-500/10 p-4">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <span className="text-red-300">Error sending message. Please try again.</span>
        </div>
      )}

      <Button 
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center space-x-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110 disabled:opacity-70"
      >
        <Send className="h-5 w-5" />
        <span>{loading ? 'Sending...' : 'Send Message'}</span>
      </Button>
    </form>
  );
};

export default ContactForm;
