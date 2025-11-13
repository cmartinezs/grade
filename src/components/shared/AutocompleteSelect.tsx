'use client'

import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';

export interface AutocompleteOption {
  id: string | number;
  name: string;
  description?: string;
}

interface AutocompleteSelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  onBlur?: () => void;
  options: AutocompleteOption[];
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  warningMessage?: string;
  autoComplete?: string;
}

export default function AutocompleteSelect({
  value,
  onChange,
  onBlur,
  options,
  placeholder = 'Escribe para buscar...',
  disabled = false,
  isInvalid = false,
  label,
  required = false,
  errorMessage,
  warningMessage,
  autoComplete = 'off'
}: AutocompleteSelectProps) {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    if (isSelecting) {
      setIsSelecting(false);
      return;
    }

    if (value && value !== '') {
      const selectedOption = options.find(opt => {
        if (typeof opt.id === 'number' && typeof value === 'string') {
          return opt.id === parseInt(value, 10);
        }
        return opt.id === value;
      });
      
      if (selectedOption) {
        setInputValue(selectedOption.name);
      } else {
        setInputValue(String(value));
      }
    } else {
      setInputValue('');
    }
  }, [value, options, isSelecting]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputValue(inputVal);

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

  const handleSelectOption = (option: AutocompleteOption) => {
    setIsSelecting(true);
    setInputValue(option.name);
    onChange(option.id);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (options.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      onBlur?.();
    }, 150);
  };

  return (
    <Form.Group className="mb-3">
      {label && (
        <Form.Label>
          {label}
          {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <div style={{ position: 'relative' }}>
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
        {showSuggestions && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              border: '1px solid #dee2e6',
              borderTop: 'none',
              borderRadius: '0 0 0.25rem 0.25rem',
              backgroundColor: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              maxHeight: '250px',
              overflowY: 'auto',
              zIndex: 9999,
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  style={{
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    backgroundColor: inputValue === option.name ? '#e9ecef' : 'transparent',
                    transition: 'background-color 0.15s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = inputValue === option.name ? '#e9ecef' : 'transparent';
                  }}
                >
                  <strong style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {option.name}
                  </strong>
                  {option.description && (
                    <small 
                      style={{ 
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                        color: '#6c757d'
                      }}
                    >
                      {option.description}
                    </small>
                  )}
                </div>
              ))
            ) : inputValue.trim() ? (
              <div style={{ padding: '0.5rem 1rem', color: '#6c757d' }}>
                No se encontraron resultados
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Error message */}
      {isInvalid && errorMessage && (
        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
          {errorMessage}
        </Form.Control.Feedback>
      )}

      {/* Warning message with Alert block */}
      {warningMessage && !isInvalid && (
        <Alert variant="warning" className="mt-3 mb-0">
          {warningMessage}
        </Alert>
      )}
    </Form.Group>
  );
}
