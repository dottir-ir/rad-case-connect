
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Calendar, 
  MessageCircle, 
  Save,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface CaseData {
  id: string;
  author: {
    name: string;
    title: string;
    avatar?: string;
  };
  patient: {
    age: number;
    gender: 'Male' | 'Female';
  };
  clinicalPresentation: string;
  images: string[];
  imagingFindings: string;
  differentialDiagnosis: string[];
  finalDiagnosis: string;
  discussion: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  isLiked: boolean;
  isSaved: boolean;
}

interface CaseCardProps {
  case: CaseData;
}

const CaseCard = ({ case: caseData }: CaseCardProps) => {
  const [isLiked, setIsLiked] = useState(caseData.isLiked);
  const [isSaved, setIsSaved] = useState(caseData.isSaved);
  const [showFullCase, setShowFullCase] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6 animate-fade-in hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={caseData.author.avatar} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-medical-blue">{caseData.author.name}</p>
              <p className="text-sm text-medical-gray">{caseData.author.title}</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-medical-gray">
            <Calendar className="h-4 w-4 mr-1" />
            {caseData.createdAt}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Patient Demographics */}
        <div className="bg-medical-gray-light rounded-lg p-4">
          <h3 className="font-semibold text-medical-blue mb-2">Patient Information</h3>
          <p className="text-sm">
            <span className="font-medium">Age:</span> {caseData.patient.age} years old
          </p>
          <p className="text-sm">
            <span className="font-medium">Gender:</span> {caseData.patient.gender}
          </p>
        </div>

        {/* Clinical Presentation */}
        <div>
          <h3 className="font-semibold text-medical-blue mb-2">Clinical Presentation</h3>
          <p className="text-medical-gray-dark">{caseData.clinicalPresentation}</p>
        </div>

        {/* Radiographic Images */}
        <div>
          <h3 className="font-semibold text-medical-blue mb-2">Radiographic Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseData.images.map((image, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Medical Image {index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {showFullCase && (
          <>
            <Separator />
            
            {/* Imaging Findings */}
            <div>
              <h3 className="font-semibold text-medical-blue mb-2">Imaging Findings</h3>
              <p className="text-medical-gray-dark">{caseData.imagingFindings}</p>
            </div>

            {/* Differential Diagnosis */}
            <div>
              <h3 className="font-semibold text-medical-blue mb-2">Differential Diagnosis</h3>
              <ul className="list-disc list-inside space-y-1">
                {caseData.differentialDiagnosis.map((diagnosis, index) => (
                  <li key={index} className="text-medical-gray-dark">{diagnosis}</li>
                ))}
              </ul>
            </div>

            {/* Final Diagnosis */}
            <div className="bg-medical-success/10 rounded-lg p-4">
              <h3 className="font-semibold text-medical-success mb-2">Final Diagnosis</h3>
              <p className="text-medical-gray-dark font-medium">{caseData.finalDiagnosis}</p>
            </div>

            {/* Teaching Discussion */}
            <div>
              <h3 className="font-semibold text-medical-blue mb-2">Teaching Discussion</h3>
              <p className="text-medical-gray-dark">{caseData.discussion}</p>
            </div>
          </>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {caseData.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-medical-blue/10 text-medical-blue">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Show More/Less Button */}
        <Button
          variant="ghost"
          onClick={() => setShowFullCase(!showFullCase)}
          className="w-full text-medical-blue hover:bg-medical-blue/5"
        >
          {showFullCase ? (
            <>
              <ArrowUp className="h-4 w-4 mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ArrowDown className="h-4 w-4 mr-2" />
              Show Full Case
            </>
          )}
        </Button>

        <Separator />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                isLiked ? 'text-medical-success' : 'text-medical-gray'
              }`}
            >
              <ArrowUp className="h-4 w-4" />
              <span>{caseData.likes + (isLiked ? 1 : 0)}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-medical-gray">
              <MessageCircle className="h-4 w-4" />
              <span>{caseData.comments}</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={`${isSaved ? 'text-medical-blue' : 'text-medical-gray'}`}
          >
            <Save className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseCard;
