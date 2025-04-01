'use client';

import { useState, useEffect } from 'react';

export default function TypewriterEffect({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  className = "",
  onComplete = () => {},
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDelayed, setIsDelayed] = useState(true);
  
  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setIsTyping(false);
    setIsDelayed(true);
    
    // Handle initial delay
    const delayTimer = setTimeout(() => {
      setIsDelayed(false);
      setIsTyping(true);
    }, delay);
    
    return () => clearTimeout(delayTimer);
  }, [text, delay]);
  
  useEffect(() => {
    let typingTimer;
    
    if (isTyping && !isDelayed) {
      if (displayedText.length < text.length) {
        // Continue typing
        typingTimer = setTimeout(() => {
          setDisplayedText(text.substring(0, displayedText.length + 1));
        }, speed);
      } else {
        // Typing complete
        setIsTyping(false);
        onComplete();
      }
    }
    
    return () => clearTimeout(typingTimer);
  }, [displayedText, isTyping, isDelayed, text, speed, onComplete]);
  
  return (
    <div className={className}>
      <span>{displayedText}</span>
      {cursor && (isTyping || isDelayed) && (
        <span className="inline-block w-1 h-5 ml-1 bg-current animate-pulse">
          &nbsp;
        </span>
      )}
    </div>
  );
}