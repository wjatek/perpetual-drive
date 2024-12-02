import { Ionicons } from '@expo/vector-icons'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export const getFileIcon = (fileName: string, style: StyleProp<TextStyle> = {}, size: number = 24) => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase()

  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <Ionicons style={style} name="image" size={size} />
    case 'pdf':
      return <Ionicons style={style} name="document" size={size} />
    case 'txt':
      return <Ionicons style={style} name="document-text" size={size} />
    case 'mp4':
    case 'mkv':
    case 'avi':
    case 'mov':
      return <Ionicons style={style} name="videocam" size={size} />
    case 'mp3':
    case 'wav':
    case 'ogg':
      return <Ionicons style={style} name="musical-note" size={size} />
    default:
      return <Ionicons style={style} name="file-tray" size={size} />
  }
}
