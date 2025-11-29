'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const blogPosts = [
  {
    title: 'Tendances de la gestion des plannings en 2024',
    date: '15 Oct 2024',
    image: '/api/placeholder/400/300',
    excerpt: 'Découvrez les dernières tendances de la gestion des plannings dans la restauration...',
    gradient: 'from-purple-100 to-pink-100',
  },
  {
    title: 'Comment optimiser votre masse salariale',
    date: '12 Oct 2024',
    image: '/api/placeholder/400/300',
    excerpt: 'Les meilleures pratiques pour réduire vos coûts tout en maintenant la qualité...',
    gradient: 'from-blue-100 to-sky-100',
  },
  {
    title: '10 astuces pour gérer une équipe efficacement',
    date: '8 Oct 2024',
    image: '/api/placeholder/400/300',
    excerpt: 'Des conseils pratiques pour améliorer la communication avec votre équipe...',
    gradient: 'from-yellow-100 to-orange-100',
  },
]

export function BlogSection() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container-standard">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-bright mb-4">
            Lisez notre{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-purple">
              Blog
            </span>
          </h2>
          <p className="text-lg text-text-mid">Articles les plus populaires</p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-3xl shadow-pastel hover:shadow-pastel-lg transition-all duration-300 overflow-hidden hover:-translate-y-2"
            >
              {/* Image */}
              <div className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-bright mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-mid mb-6 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
                >
                  Lire la suite
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2"
        >
          <button className="w-10 h-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className={`w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center font-semibold ${
                num === 1
                  ? 'bg-primary text-white shadow-pastel'
                  : 'bg-gray-100 text-text-mid hover:bg-gray-200'
              }`}
            >
              {num}
            </button>
          ))}
          <button className="w-10 h-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center">
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button href="/blog" variant="secondary" size="lg">
            Voir tous les articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

