import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to console for debugging
    console.error('Schema Error Boundary caught an error:', error, errorInfo)

    // Check if it's a schema-related error
    if (error.message.includes('schema') || error.message.includes('Schema')) {
      console.error('This appears to be a schema-related error. Possible fixes:')
      console.error('1. Check that all schema files export valid schema definitions')
      console.error('2. Verify validation rules use proper syntax: (Rule) => Rule.required()')
      console.error('3. Ensure schema types array is properly structured')
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          padding: '20px',
          backgroundColor: '#fff5f5',
          border: '1px solid #fed7d7',
          borderRadius: '6px',
          margin: '20px',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h2 style={{ color: '#c53030', marginBottom: '10px' }}>
            🚨 Schema Configuration Error
          </h2>
          <p style={{ color: '#742a2a', marginBottom: '15px' }}>
            There's an issue with the Sanity Studio schema configuration.
          </p>
          <details style={{ marginBottom: '15px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Error Details
            </summary>
            <pre style={{
              backgroundColor: '#fffafa',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px',
              marginTop: '10px'
            }}>
              {this.state.error?.message || 'Unknown error'}
            </pre>
          </details>
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
            <h3 style={{ marginTop: 0, color: '#2d3748' }}>Possible Solutions:</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568' }}>
              <li>Check that all schema files are properly exported</li>
              <li>Verify validation rules use arrow function syntax: <code>(Rule) =&gt; Rule.required()</code></li>
              <li>Ensure schema types array is properly structured in sanity.config.ts</li>
              <li>Check for syntax errors in defineField() definitions</li>
              <li>Verify all imports are working correctly</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Reload Studio
          </button>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              backgroundColor: '#38a169',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
