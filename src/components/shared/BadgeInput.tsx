'use client';

/**
 * BadgeInput Component
 * Input que permite agregar y visualizar items como badges/chips
 * Útil para tags, identificadores personalizados, etc.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Form, Badge } from 'react-bootstrap';
import styles from './BadgeInput.module.css';

interface BadgeInputProps {
  value: string[]; // Array de items para mostrar como badges
  onChange: (items: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  helperText?: string;
  maxItems?: number;
  allowDuplicates?: boolean;
  separator?: string; // Carácter para separar items (default: coma)
}

export default function BadgeInput({
  value,
  onChange,
  placeholder = 'Escribe y presiona Enter para agregar...',
  disabled = false,
  isInvalid = false,
  label,
  required = false,
  errorMessage,
  helperText,
  maxItems,
  allowDuplicates = false,
  separator = ',',
}: BadgeInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cuando value cambia desde afuera (ej: reset del formulario)
  useEffect(() => {
    if (!isFocused && inputValue === '') {
      // No hacer nada, permitir que el usuario siga escribiendo
    }
  }, [value, isFocused, inputValue]);

  const handleAddItem = () => {
    const trimmed = inputValue.trim();
    
    if (!trimmed) {
      return;
    }

    // Validar si ya existe (si no se permiten duplicados)
    if (!allowDuplicates && value.some(item => item.toLowerCase() === trimmed.toLowerCase())) {
      setInputValue('');
      return;
    }

    // Validar límite de items
    if (maxItems && value.length >= maxItems) {
      setInputValue('');
      return;
    }

    // Agregar item
    onChange([...value, trimmed]);
    setInputValue('');

    // Enfocar el input de nuevo
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleRemoveItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      // Si el input está vacío y presiona backspace, eliminar el último badge
      handleRemoveItem(value.length - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Permitir paste y parsear por separador
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain');
    const items = pastedText
      .split(separator)
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const newItems: string[] = [...value];
    for (const item of items) {
      if (maxItems && newItems.length >= maxItems) break;
      if (!allowDuplicates && newItems.some(i => i.toLowerCase() === item.toLowerCase())) continue;
      newItems.push(item);
    }

    onChange(newItems);
    setInputValue('');
  };

  return (
    <Form.Group className="mb-3">
      {label && (
        <Form.Label>
          {label}
          {required && <span className="text-danger"> *</span>}
        </Form.Label>
      )}

      <div 
        className={`${styles.badgeInputContainer} ${isFocused ? styles.focused : ''} ${isInvalid ? styles.invalid : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Badges */}
        <div className={styles.badgesWrapper}>
          {value.map((item, index) => (
            <Badge 
              key={index} 
              bg="primary" 
              className={styles.badge}
              title={item}
            >
              <span className={styles.badgeText}>{item}</span>
              <button
                type="button"
                className={styles.badgeRemove}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveItem(index);
                }}
                disabled={disabled}
                aria-label={`Eliminar ${item}`}
              >
                ✕
              </button>
            </Badge>
          ))}
        </div>

        {/* Input */}
        {!maxItems || value.length < maxItems ? (
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={value.length === 0 ? placeholder : ''}
            disabled={disabled}
            autoComplete="off"
          />
        ) : null}
      </div>

      {/* Helper Text */}
      {helperText && !isInvalid && (
        <Form.Text className="text-muted d-block mt-2">
          {helperText}
        </Form.Text>
      )}

      {/* Max Items Info */}
      {maxItems && (
        <Form.Text className="text-muted d-block mt-2">
          {value.length}/{maxItems}
        </Form.Text>
      )}

      {/* Error Message */}
      {isInvalid && errorMessage && (
        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
