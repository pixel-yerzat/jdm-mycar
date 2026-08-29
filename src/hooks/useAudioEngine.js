import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * Custom Hook: useAudioEngine
 * Handles loading the 2JZ engine rev audio, Web Audio API context,
 * smooth exponential volume envelopes (no loop glitch), and simulated tachometer RPM/Boost telemetry.
 */
export function useAudioEngine(audioUrl = '/sound/supra_sound.mp3') {
  const [isThrottleActive, setIsThrottleActive] = useState(false)
  const [rpm, setRpm] = useState(900)
  const [boost, setBoost] = useState(-0.4)

  const audioCtxRef = useRef(null)
  const audioBufferRef = useRef(null)
  const sourceNodeRef = useRef(null)
  const gainNodeRef = useRef(null)
  const rpmIntervalRef = useRef(null)
  const autoStopTimeoutRef = useRef(null)

  // Preload audio buffer on mount
  useEffect(() => {
    const loadAudio = async () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (!AudioCtx) return
        audioCtxRef.current = new AudioCtx()

        const response = await fetch(audioUrl)
        const arrayBuffer = await response.arrayBuffer()
        audioBufferRef.current = await audioCtxRef.current.decodeAudioData(arrayBuffer)
      } catch (err) {
        console.warn('Audio preloading info:', err)
      }
    }
    loadAudio()

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [audioUrl])

  // Stop Engine Rev
  const stopGas = useCallback(() => {
    setIsThrottleActive(false)
    if (autoStopTimeoutRef.current) {
      clearTimeout(autoStopTimeoutRef.current)
      autoStopTimeoutRef.current = null
    }

    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current
      const now = ctx.currentTime
      try {
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, now)
        gainNodeRef.current.exponentialRampToValueAtTime(0.001, now + 0.28)
      } catch (_) {}

      setTimeout(() => {
        if (sourceNodeRef.current) {
          try {
            sourceNodeRef.current.stop()
            sourceNodeRef.current.disconnect()
          } catch (_) {}
          sourceNodeRef.current = null
        }
      }, 300)
    }

    if (rpmIntervalRef.current) clearInterval(rpmIntervalRef.current)
    rpmIntervalRef.current = setInterval(() => {
      setRpm((prev) => {
        if (prev <= 950) {
          clearInterval(rpmIntervalRef.current)
          return 900
        }
        return prev - 450
      })
      setBoost((prev) => {
        if (prev <= -0.4) return -0.4
        return +(prev - 0.2).toFixed(2)
      })
    }, 35)
  }, [])

  // Start Engine Rev
  const startGas = useCallback(() => {
    if (isThrottleActive) {
      stopGas()
      return
    }

    setIsThrottleActive(true)

    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }

    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop()
        sourceNodeRef.current.disconnect()
      } catch (_) {}
    }

    if (audioBufferRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current
      const now = ctx.currentTime

      const source = ctx.createBufferSource()
      source.buffer = audioBufferRef.current
      source.loop = false

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, now)
      gain.gain.exponentialRampToValueAtTime(0.85, now + 0.12)

      gain.gain.setValueAtTime(0.85, now + 2.9)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.4)

      source.connect(gain)
      gain.connect(ctx.destination)

      source.start(0)
      source.stop(now + 3.45)

      sourceNodeRef.current = source
      gainNodeRef.current = gain

      if (autoStopTimeoutRef.current) clearTimeout(autoStopTimeoutRef.current)
      autoStopTimeoutRef.current = setTimeout(() => {
        stopGas()
      }, 3400)
    }

    if (rpmIntervalRef.current) clearInterval(rpmIntervalRef.current)
    rpmIntervalRef.current = setInterval(() => {
      setRpm((prev) => {
        const next = prev + Math.floor(Math.random() * 600 + 450)
        return next >= 7800 ? 7600 + Math.floor(Math.random() * 300) : next
      })
      setBoost((prev) => {
        const next = +(prev + 0.25).toFixed(2)
        return next >= 1.4 ? +(1.35 + Math.random() * 0.1).toFixed(2) : next
      })
    }, 45)
  }, [isThrottleActive, stopGas])

  return {
    isThrottleActive,
    rpm,
    boost,
    startGas,
    stopGas
  }
}
