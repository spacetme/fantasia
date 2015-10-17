
export let now

if (window.performance && typeof window.performance.now === 'function') {
  now = () => window.performance.now()
} else {
  now = () => Date.now()
}

export default now
