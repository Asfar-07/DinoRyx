import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars'
import { useState } from "react"
import { questions } from "./Questions.ts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

type Answers = Record<number, string>


export default function Welcome() {
  const [isStarted, setIsStarted] = useState(false)
  const [step, setStep] = useState<number>(0)
  const [answers, setAnswers] = useState<Answers>({})

  const current = questions[step]

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: value,
    }))
  }

  const next = () => {
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1)
    } else {
      console.log("Submit answers:", answers)
    }
  }

  const previous = () => {
    if (step > 0) {
      setStep((prev) => prev - 1)
    }
  }

  const progress = ((step + 1) / questions.length) * 100

  function displayAnimation() {
    return (
      <main className='z-10 absolute top-0 flex flex-col justify-center items-center left-0 w-full h-full'>
        <h1 className=' text-5xl z-10 font-bold text-white uppercase'>Welcome to the DinoRyx</h1>
        <p className='text-lg text-white z-10 mt-4'>Thank you for joining our community!</p>
        <button className='bg-(--symbol-color) my-4 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded cursor-pointer'
        onClick={()=>{
          setIsStarted(true);
        }}>
          Get Started
        </button>
      </main>
    );
  }
  if(isStarted) return (
    <div className="flex items-center justify-center min-h-screen bg-muted">

      <Card className="w-125">
        <CardHeader>
          <CardTitle>{current.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <Progress value={progress} />

          <RadioGroup
            value={answers[current.id]}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {current.options.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-3 border rounded-lg p-3"
              >
                <RadioGroupItem value={option} id={option} />
                <label htmlFor={option} className="cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between">

            <Button
              variant="outline"
              disabled={step === 0}
              onClick={previous}
            >
              Previous
            </Button>

            <div className="flex gap-2">

              {current.optional && (
                <Button
                  variant="secondary"
                  onClick={next}
                >
                  Skip
                </Button>
              )}

              <Button onClick={next}>
                {step === questions.length - 1 ? "Finish" : "Next"}
              </Button>

            </div>

          </div>

        </CardContent>
      </Card>

    </div>
  );
  
  return (
    <div className='w-full h-screen relative overflow-hidden'>
      <StarsBackground className='z-5 fixed top-0 left-0' Component={displayAnimation}/>
    </div>
  )
}
