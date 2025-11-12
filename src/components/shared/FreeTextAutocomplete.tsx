'use client'

import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export interface FreeTextAutocompleteOption {
  id?: string | number;
  name: string;
  description?: string;
}

interface FreeTextAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: FreeTextAutocompleteOption[];
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  autoComplete?: string;
}

export default function FreeTextAutocomplete({
  value,
  onChange,
  onBlur,
  options,
  placeholder = 'Escribe o selecciona...',
  disabled = false,
  isInvalid = false,
  label,
  required = false,
  errorMessage,
  autoComplete = 'off'
}: FreeTextAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<FreeTextAutocompleteOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Initialize input value when value prop changes
  // For free text, we just use the value directly
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Initialize filtered options
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputValue(inputVal);
    // Always call onChange with the current input value (free text mode)
    onChange(inputVal);

    if (inputVal.trim()) {
      const filtered = options.filter(opt =>
        opt.name.toLowerCase().includes(inputVal.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredOptions(options);
      setShowSuggestions(false);
    }
  };

  const handleSelectOption = (option: FreeTextAutocompleteOption) => {
    // When selecting an option, use its name as the value
    const selectedValue = option.name;
    setInputValue(selectedValue);
    onChange(selectedValue);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (options.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay to allow click on suggestion to register
    setTimeout(() => {
      setShowSuggestions(false);
      onBlur?.();
    }, 150);
  };

  return (
    <Form.Group className="mb-3" style={{ position: 'relative' }}>
      {label && (
        <Form.Label>
          {label}
          {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <Form.Control
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        isInvalid={isInvalid}
        autoComplete={autoComplete}
      />

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredOptions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            border: '1px solid #dee2e6',
            borderTop: 'none',
            borderRadius: '0 0 0.25rem 0.25rem',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginTop: '-4px'
          }}
        >
          {filteredOptions.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectOption(option)}
              style={{
                padding: '10px 15px',
                cursor: 'pointer',
                backgroundColor: inputValue === option.name ? '#e9ecef' : '#fff',
                borderBottom: '1px solid #f0f0f0',
                transition: 'background-color 0.15s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  inputValue === option.name ? '#e9ecef' : '#fff';
              }}
            >
              <strong>{option.name}</strong>
              {option.description && (
                <>
                  <br />
                  <small className="text-muted">{option.description}</small>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {filteredOptions.length === 0 && showSuggestions && inputValue.trim() && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            border: '1px solid #dee2e6',
            borderTop: 'none',
            borderRadius: '0 0 0.25rem 0.25rem',
            padding: '10px 15px',
            zIndex: 1000,
            textAlign: 'center',
            color: '#6c757d',
            fontSize: '0.875rem',
            marginTop: '-4px'
          }}
        >
          No se encontraron resultados
        </div>
      )}

      {/* Error message */}
      {isInvalid && errorMessage && (
        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
