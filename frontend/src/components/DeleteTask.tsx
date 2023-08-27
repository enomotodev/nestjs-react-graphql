import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';
import { DELETE_TASK } from '../mutations/taskMutations.ts';
import { GET_TASKS } from '../queries/taskQueries.ts';
import { useNavigate } from 'react-router-dom';

const DeleteTask = ({ id, userId }: { id: number, userId: number }) => {
  const navigate = useNavigate()
  const [deleteTask] = useMutation<{ deleteTask: number }>(DELETE_TASK)

  const handleDeleteTask = async () => {
    try {
      await deleteTask({
        variables: { id },
        refetchQueries: [{
          query: GET_TASKS, variables: { userId }
        }]
      })
      alert('タスクが削除されました')
    } catch (err: any) {
      if (err.message === 'Unauthorized') {
        localStorage.removeItem('token')
        alert('トークンの有効期限が切れました。サインイン画面に遷移します。')
        navigate('/signin')
        return
      }

      alert('タスクの削除に失敗しました')
    }
  }

  return (
    <Tooltip title='削除'>
      <IconButton onClick={handleDeleteTask}>
        <DeleteIcon color='action' />
      </IconButton>
    </Tooltip>
  )
}

export default DeleteTask
