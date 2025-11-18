'use client'

import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import styles from './AutocompleteSelect.module.css';

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
        // Si no se encuentra la opción, mostrar placeholder si no hay opciones cargadas aún
        if (options.length === 0) {
          setInputValue('');
        } else {
          setInputValue(String(value));
        }
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

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setInputValue('');
    onChange('');
    setShowSuggestions(false);
  };

  return (
    <Form.Group className="mb-3">
      {label && (
        <Form.Label>
          {label}
          {required && <span className="text-danger"> *</span>}
        </Form.Label>
      )}

      <div className={styles.container}>
        <div className={styles.inputWrapper}>
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
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <div className={styles.suggestionsDropdown}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = String(value) === String(option.id);
                const isEvenRow = index % 2 === 0;
                
                // Build class names based on state
                const optionClasses = [
                  styles.option,
                  isSelected ? styles.optionSelected : (isEvenRow ? styles.optionEven : styles.optionOdd)
                ].join(' ');
                
                return (
                  <div
                    key={option.id}
                    className={optionClasses}
                    onClick={() => handleSelectOption(option)}
                  >
                    <div className={styles.optionContent}>
                      <div>
                        <strong className={isSelected ? styles.optionNameSelected : styles.optionName}>
                          {option.name}
                        </strong>
                        {option.description && (
                          <small className={isSelected ? styles.descriptionSelected : styles.description}>
                            {option.description}
                          </small>
                        )}
                      </div>
                      {isSelected && (
                        <button
                          type="button"
                          className={styles.clearButtonInDropdown}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClear(e);
                          }}
                          title="Limpiar selección"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : inputValue.trim() ? (
              <div className={styles.noResults}>
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
