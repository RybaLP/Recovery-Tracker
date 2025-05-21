import { useElapsedTime } from '@/hooks/useElapsedTime';
import { Card, CardContent, CardTitle } from './ui/card'
import { AddictionCardProps } from '@/interfaces/addictionCardPropts'

const AddictionCard : React.FC<AddictionCardProps> = ({addiction}) => {

    const startTimeDate = new Date(addiction.startTime);
    const elapsedTime = useElapsedTime(startTimeDate);

    return (
    <Card key={addiction.id} className="w-full max-w-sm p-4 rounded-lg shadow-md">
      <CardTitle className="text-xl font-semibold mb-2">{addiction.addictionName}</CardTitle>
      <CardContent className="text-gray-700">
        <p className="mb-1">Notatki: {addiction.notes || 'Brak'}</p>
        <p className="font-medium text-blue-600">Czas trwania: {elapsedTime}</p>
      </CardContent>
    </Card>
  );
    

    
}

export default AddictionCard
