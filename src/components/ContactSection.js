import React, { useState, useEffect, useRef, useMemo } from 'react'; // Asegúrate de importar useRef
// import useScrollAnimation from '../hooks/useScrollAnimation'; // No lo usaremos directamente aquí para este efecto

const ContactSection = () => {
  // useScrollAnimation(); // Deshabilitamos este hook si vamos a implementar la lógica de scroll aquí
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Estados para controlar la visibilidad de los elementos para la animación
  const [headerVisible, setHeaderVisible] = useState(false);
  const [codeBlockVisible, setCodeBlockVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  // Refs para observar los elementos
  const headerRef = useRef(null);
  const codeBlockRef = useRef(null);
  const formRef = useRef(null);


  // Posiciones calculadas una sola vez (antes se recalculaban en cada render)
  const floatingSymbols = useMemo(
    () => [...Array(20)].map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      text: i % 2 === 0 ? '//' : 'const',
    })),
    []
  );

  const codeLines = [
    "// Ready to connect?",
    "const contactForm = {",
    "  name: '',",
    "  email: '',",
    "  message: ''",
    "};",
    "function handleSubmit() {",
    "  // Send message logic here",
    "}"
  ];

  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Nuevo useEffect para los IntersectionObservers
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Activar cuando el 10% del elemento sea visible
    };

    // Observador para el encabezado
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observador para el bloque de código
    const codeBlockObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCodeBlockVisible(true);
          codeBlockObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observador para el formulario
    const formObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setFormVisible(true);
          formObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Adjuntar observadores a los elementos
    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (codeBlockRef.current) codeBlockObserver.observe(codeBlockRef.current);
    if (formRef.current) formObserver.observe(formRef.current);

    // Función de limpieza para desconectar los observadores
    return () => {
      if (headerRef.current) headerObserver.unobserve(headerRef.current);
      if (codeBlockRef.current) codeBlockObserver.unobserve(codeBlockRef.current);
      if (formRef.current) formObserver.unobserve(formRef.current);
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null); // Reset previous status

    try {
      const response = await fetch('https://hook.eu2.make.com/wucgkxfx2s2edfi4wauy85nb6zs3bo9a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Error al enviar el formulario:', response.status);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-ink-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        {floatingSymbols.map((sym, i) => (
          <div
            key={i}
            className="absolute font-mono text-xs text-blue-400"
            style={{ left: `${sym.left}%`, top: `${sym.top}%`, opacity: 0.3 }}
          >
            {sym.text}
          </div>
        ))}
      </div>
      <div className="aurora -right-32 -top-20 h-[380px] w-[380px] bg-violet-700/50" />
      <div className="aurora -left-32 bottom-0 h-[340px] w-[340px] bg-blue-600/40" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Encabezado de la sección */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ease-out
                      ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
            <span className="text-lux">Contacto</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o proyecto en mente? ¡Escríbeme!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          {/* Bloque de código */}
          <div
            ref={codeBlockRef}
            className={`lg:w-1/2 transition-all duration-700 ease-out delay-200
                        ${codeBlockVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="h-full rounded-2xl border border-white/10 bg-ink-950/70 backdrop-blur-md overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 font-mono text-xs text-gray-500">contact.js</span>
              </div>
              <div className="p-6 sm:p-8 overflow-x-auto">
                {codeLines.map((line, index) => (
                  <div
                    key={index}
                    className={`font-mono text-sm sm:text-base mb-2 whitespace-pre ${index === 0 ? 'text-cyan-300' : 'text-gray-400'} ${index === 1 || index === 5 ? 'mt-4' : ''}`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div
            ref={formRef}
            className={`lg:w-1/2 w-full transition-all duration-700 ease-out delay-300
                        ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {submitStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/10 text-emerald-50 p-8 text-center" role="status">
                <h3 className="text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
                <p>Te responderé pronto. ¡Gracias por contactarme!</p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="btn-ghost mt-6"
                >
                  Enviar otro
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8">
                <div className="mb-6">
                  <label htmlFor="contact-name" className="block text-gray-400 mb-2 font-mono text-sm">
                    $ Nombre
                  </label>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] transition-all focus-within:border-violet-400/70 focus-within:shadow-[0_0_0_4px_rgba(139,92,246,0.15)]">
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent py-3 px-4 text-white placeholder-gray-600 focus:outline-none"
                    placeholder="Introduce tu nombre"
                  />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="contact-email" className="block text-gray-400 mb-2 font-mono text-sm">
                    $ Email
                  </label>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] transition-all focus-within:border-violet-400/70 focus-within:shadow-[0_0_0_4px_rgba(139,92,246,0.15)]">
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent py-3 px-4 text-white placeholder-gray-600 focus:outline-none"
                    placeholder="tu@email.com"
                  />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="contact-message" className="block text-gray-400 mb-2 font-mono text-sm">
                    $ Mensaje
                  </label>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] transition-all focus-within:border-violet-400/70 focus-within:shadow-[0_0_0_4px_rgba(139,92,246,0.15)]">
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent py-3 px-4 text-white placeholder-gray-600 focus:outline-none resize-none"
                    placeholder="Escriba su mensaje aquí..."
                  ></textarea>
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <p className="mb-4 text-sm text-red-300" role="alert">
                    No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-lux w-full"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">Enviando</span>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    </span>
                  ) : (
                    "Enviar"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;