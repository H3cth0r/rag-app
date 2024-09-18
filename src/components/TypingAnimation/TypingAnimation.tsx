"use client"

import React, { useState, useEffect } from 'react';

export const TypingAnimation = ({ baseText, phrases, typingSpeed = 100, pauseDuration = 2000, deletingSpeed = 50 }) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer;

    const animateText = () => {
      const currentPhrase = phrases[phraseIndex];
      const fullText = baseText + currentPhrase;

      if (isTyping) {
        if (text !== fullText) {
          setText(fullText.slice(0, text.length + 1));
          timer = setTimeout(animateText, typingSpeed);
        } else {
          setIsPaused(true);
          timer = setTimeout(() => {
            setIsPaused(false);
            setIsTyping(false);
          }, pauseDuration);
        }
      } else {
        if (text !== baseText) {
          setText(text.slice(0, -1));
          timer = setTimeout(animateText, deletingSpeed);
        } else {
          setIsTyping(true);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      }
    };

    timer = setTimeout(animateText, isTyping ? typingSpeed : deletingSpeed);

    return () => clearTimeout(timer);
  }, [text, phraseIndex, isTyping, isPaused, baseText, phrases, typingSpeed, pauseDuration, deletingSpeed]);

  return (
    <h1 className="scroll-m-20 text-7xl font-bold tracking-tight lg:text-7xl">
      {text}
      <span className={`font-thin animate-blink ${isPaused ? 'opacity-0' : ''}`}>|</span>
    </h1>
  );
};
