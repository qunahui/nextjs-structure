/* eslint-disable react/display-name */
import dynamic from 'next/dynamic'
import React, { useRef, useState, useMemo } from 'react'
import { useDebounce } from 'react-use'
import axios from '~/utils/axios'

let parchment = null

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    const { default: ImageResize } = await import('quill-image-resize-module-react')
    const { default: VideoResize } = await import('quill-video-resize-module2')
    parchment = await RQ.Quill.import('parchment')
    await RQ.Quill.register('modules/imageResize', ImageResize)
    await RQ.Quill.register('modules/VideoResize', VideoResize)
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />
  },
  {
    ssr: false,
  },
)

const Editor = ({ theme = 'snow', placeholder = '', value = '', onChange, onFocus = () => {} }) => {
  const [html, setHtml] = useState(value)
  const quillRef = useRef()

  const [, cancel] = useDebounce(() => onChange?.(html), 750, [html])

  const imageHandler = () => {
    const input = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      const formData = new FormData()
      const quillObj = quillRef.current.getEditor()

      formData.append('image', file)
      formData.append('type', 'default')

      // Save current cursor state
      const range = quillRef.current.getEditorSelection()

      // Insert temporary loading placeholder image
      quillObj.insertEmbed(range.index, 'image', '/assets/gif/loading.gif')

      // Move cursor to right side of image (easier to continue typing)
      quillObj?.setSelection?.(range.index + 1)

      const apiPostNewsImage = async (form) => {
        const res = await axios.post('/api/v1/images', form, {
          'Content-Type': 'multipart/form-data',
        })
        return res?.data?.url
      }
      const res = await apiPostNewsImage(formData)

      quillObj.deleteText(range.index, 1)
      quillObj.insertEmbed(range.index, 'image', res)
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: 1 }, { header: 2 }],
          [{ color: [] }, { background: [] }],
          [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['bold', 'italic', 'underline', 'blockquote'],
          ['image', 'video'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        parchment,
        handleStyles: {
          color: 'white',
        },
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
      VideoResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
        tagName: 'iframe', // iframe | video
      },
    }),
    [],
  )

  return (
    <ReactQuill
      forwardedRef={quillRef}
      theme={theme}
      value={html}
      onChange={(html) => setHtml(html)}
      onFocus={onFocus}
      placeholder={placeholder}
      modules={modules}
    />
  )
}

export default Editor
