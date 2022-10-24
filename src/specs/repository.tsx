import { RepositorySpec } from "../classes/Repository"

const repository : RepositorySpec = {
    "courses": {
        "3blue1brown_linearalgebra": {
            "title": "3Blue1Brown - Linear Algebra",
            "description": "Exercises to support the 3Blue1Brown Linear Algebra playlist.",
            "exercises": [
                {
                    "exerciseid": "matrixmultiply"
                }
            ]
        },
        "nsw_year_2": {
            "title": "NSW Grade 2",
            "description": "Exercises for topics covered in Grade 2 of the NSW syllabus.",
            "exercises": [
                {
                    "exerciseid": "simpleaddition"
                }
            ]
        },
        "nsw_year_9": {
            "title": "NSW Year 9",
            "description": "Exercises for topics covered in Year 9 of the NSW syllabus.",
            "exercises": [
                {
                    "exerciseid": "integerarithmetic_simplenegativenumbers"
                },
                {
                    "exerciseid": "integerarithmetic_roundingsigfigures"
                },
                {
                    "exerciseid": "integerarithmetic_roundingdecplaces"
                }
            ]
        }
    },
    "exercises": {
        "simpleaddition": {
            "title": "Simple Addition",
            "description": "Adding two or three numbers that are 1-10",
            "parameters": {
                "newmax": {
                    "type": "number",
                    "default": 35
                }
            },
            "stages": [
                {
                    "type": "text",
                    "text": "Welcome to the exercise"
                },
                {
                    "type": "problem",
                    "probid": "twonumber",
                    "parameters": {
                        "max": "newmax"
                    }
                },
                {
                    "type": "problem",
                    "probid": "twonumber"
                }
            ],
            "finish": {
                "text": "You've finished! Well done!"
            }
        },
        "integerarithmetic_roundingsigfigures": {
            "title": "Rounding significant figures",
            "description": "Rounding significant figures with \"closer to\" introductions.",
            "topic": "Integer Arithmetic",
            "parameters": {},
            "stages": [
                {
                    "type": "problem",
                    "probid": "integerarithmetic_roundingsigfigures2part",
                    "repeats": 4
                },
                {
                    "type": "problem",
                    "probid": "integerarithmetic_roundingsigfigures",
                    "repeats": 4
                }
            ],
            "finish": {
                "text": "You've finished!"
            }
        },
        "integerarithmetic_roundingdecplaces": {
            "title": "Rounding to decimal places",
            "description": "Rounding to decimal places with initial \"Closer to\" introduction",
            "topic": "Integer Arithmetic",
            "parameters": {},
            "stages": [
                {
                    "type": "problem",
                    "probid": "integerarithmetic_roundingdecplaces2part",
                    "repeats": 4
                },
                {
                    "type": "problem",
                    "probid": "integerarithmetic_roundingdecplaces",
                    "repeats": 4
                }
            ],
            "finish": {
                "text": "You've finished!"
            }
        },
        "integerarithmetic_simplenegativenumbers": {
            "title": "Simple negative number arithmetic",
            "description": "Adding, subtracting, multiplying, and dividing negative numbers",
            "topic": "Integer Arithmetic",
            "stages": [
                {
                    "type": "problem",
                    "probid": "integerarithmetic_simplenegativenumberaddition",
                    "repeats": 2
                },
                {
                    "type": "problem",
                    "probid": "integerarithmetic_simplenegativenumbersubtraction",
                    "repeats": 2
                },
                {
                    "type": "problem",
                    "probid": "integerarithmetic_simplenegativenumbermultiplication",
                    "repeats": 2
                },
                {
                    "type": "problem",
                    "probid": "integerarithmetic_simplenegativenumberdivision",
                    "repeats": 2
                }
            ]
        },
        "matrixvector": {
            "title": "Applying a matrix to a vector",
            "description": "Applying a linear transformation matrix to a vector",
            "topic": "Linear Algebra",
            "stages": [
                {
                    "type": "text",
                    "text": "Welcome to the exercise"
                },
                {
                    "type": "problem",
                    "probid": "2x2matrixvectormultiply"
                },
                {
                    "type": "problem",
                    "probid": "2x2matrixvectormultiply"
                },
                {
                    "type": "problem",
                    "probid": "2x2matrixvectormultiply"
                },
                {
                    "type": "problem",
                    "probid": "2x2matrixvectormultiply"
                }
            ],
            "finish": {
                "text": "You've finished! Well done!"
            }
        },
        "matrixmultiply": {
            "title": "Multiplying matrices",
            "description": "Multiplying matrices",
            "topic": "Linear Algebra",
            "stages": [
                {
                    "type": "text",
                    "text": "Welcome to the exercise"
                },
                {
                    "type": "problem",
                    "probid": "2x2matrixmultiply"
                },
                {
                    "type": "problem",
                    "probid": "2x2matrixmultiply"
                },
                {
                    "type": "problem",
                    "probid": "2x2matrixmultiply"
                },
                {
                    "type": "problem",
                    "probid": "2x2matrixmultiply"
                }
            ],
            "finish": {
                "text": "You've finished! Well done!"
            }
        }
    },
    "problems": {
        "twonumber": {
            "title": "Simple 2 number addition",
            "description": "Adding together two numbers that are less than ten",
            "parameters": {
                "max": {
                    "type": "number",
                    "default": 10
                },
                "min": {
                    "type": "number",
                    "default": 1
                }
            },
            "variables": {
                "a": {
                    "type": "number",
                    "min": "{{min}}",
                    "max": "{{max}}",
                    "step": 1
                },
                "b": {
                    "type": "number",
                    "min": "{{min}}",
                    "max": "{{max}}",
                    "step": 1
                }
            },
            "question": "What is ${{a}} + {{b}}$?",
            "answer": {
                "type": "number",
                "value": "{{a + b}}"
            }
        },
        "threenumber": {
            "title": "Simple 3 number addition",
            "description": "Adding together three numbers that are less than ten",
            "variables": {
                "a": {
                    "type": "number",
                    "min": 1,
                    "max": 10,
                    "step": 1
                },
                "b": {
                    "type": "number",
                    "min": 1,
                    "max": 10,
                    "step": 1
                },
                "c": {
                    "type": "number",
                    "min": 1,
                    "max": 10,
                    "step": 1
                }
            },
            "question": "What is ${{a}} + {{b}} + {{c}}$?",
            "answer": {
                "type": "number",
                "value": "{{ a + b + c }}"
            }
        },
        "integerarithmetic_roundingsigfigures2part": {
            "title": "Round significant figures 2 parts",
            "description": "Rounding to significant figures with \"closer to\" introduction",
            "additionalparts": [
                {
                    "question": "What is ${{floor(n/(10**d))}}$ rounded to {{sf}} significant figures?",
                    "answer": {
                        "type": "number",
                        "label": "Answer:",
                        "value": "{%if floor(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d)) == round(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d)) %}{{floor(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d))}}{%else%}{{round(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d))}}{%endif%}",
                        "precision": "0",
                        "decimals": "0"
                    }
                }
            ],
            "question": "Is ${{floor(n/(10**d))}}$ closer to ${{floor(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d))}}$ or ${{floor(floor(n/(10**d))/(10**(7-sf-d))+1)*(10**(7-sf-d))}}$?\n\n\nNote: numbers ending in 5 round up",
            "answer": {
                "type": "multiplechoice",
                "label": "Answer:",
                "values": [
                    "{%if floor(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d)) == round(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d)) %}{{floor(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d))}}{%else%}{{floor(floor(n/(10**d))/(10**(7-sf-d))+1)*(10**(7-sf-d))}}{%endif%}",
                    "{%if floor(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d)) != round(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d)) %}{{floor(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d))}}{%else%}{{floor(floor(n/(10**d))/(10**(7-sf-d))+1)*(10**(7-sf-d))}}{%endif%}"
                ],
                "answer": 0
            },
            "parameters": {},
            "variables": {
                "n": {
                    "type": "number",
                    "min": "1000000",
                    "max": "9999999",
                    "step": 1,
                    "example": 7177284
                },
                "d": {
                    "type": "number",
                    "min": "0",
                    "max": "5",
                    "step": 1,
                    "example": 3
                },
                "sf": {
                    "type": "number",
                    "min": "1",
                    "max": "{{6-d}}",
                    "step": 1,
                    "example": 2
                }
            }
        },
        "integerarithmetic_roundingsigfigures": {
            "title": "Round significant figures",
            "description": "Rounding to significant figures",
            "additionalparts": [],
            "question": "What is ${{floor(n/(10**d))}}$ rounded to {{sf}} significant figures?",
            "answer": {
                "type": "number",
                "label": "Answer:",
                "value": "{%if floor(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d)) == round(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d)) %}{{floor(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d))}}{%else%}{{round(floor(n/(10**d))/(10**(7-sf-d)))*(10**(7-sf-d))}}{%endif%}",
                "precision": "0",
                "decimals": "0"
            },
            "parameters": {},
            "variables": {
                "d": {
                    "type": "number",
                    "min": 0,
                    "max": "5",
                    "step": 1,
                    "example": 1
                },
                "sf": {
                    "type": "number",
                    "min": "1",
                    "max": "{{6-d}}",
                    "step": 1,
                    "example": 4
                },
                "n": {
                    "type": "number",
                    "min": "1000000",
                    "max": "9999999",
                    "step": 1,
                    "example": 5109776
                }
            }
        },
        "integerarithmetic_roundingdecplaces2part": {
            "title": "Rounding to decimal places 2 part",
            "description": "Rounding to decimal places with \"closer to\" introduction",
            "additionalparts": [
                {
                    "question": "What is ${{floor(n/(10**(7-d)))/(10**dp)}}$ to ${{tdp}}$ decimal places?",
                    "answer": {
                        "type": "number",
                        "label": "Answer:",
                        "value": "{% if floor(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp) == round(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp) %}{{showDecimals(floor(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp), tdp)}}{%else%}{{showDecimals(ceil(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp), tdp)}}{%endif%}",
                        "precision": "0",
                        "decimals": "0"
                    }
                }
            ],
            "question": "Is ${{floor(n/(10**(7-d)))/(10**dp)}}$ closer to ${{showDecimals(floor(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp), tdp)}}$ or ${{showDecimals(ceil(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp), tdp)}}$?\n\n\nNote: numbers ending in 5 round up",
            "answer": {
                "type": "multiplechoice",
                "label": "Answer:",
                "values": [
                    "{% if floor(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp) == round(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp) %}${{showDecimals(floor(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp), tdp)}}${%else%}${{showDecimals(ceil(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp), tdp)}}${%endif%}",
                    "{% if floor(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp) !== round(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp) %}${{showDecimals(floor(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp), tdp)}}${%else%}${{showDecimals(ceil(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp), tdp)}}${%endif%}"
                ],
                "answer": 0
            },
            "parameters": {},
            "variables": {
                "n": {
                    "type": "number",
                    "min": "1000000",
                    "max": "9999999",
                    "step": 1,
                    "example": 5608150
                },
                "d": {
                    "type": "number",
                    "min": "3",
                    "max": "7",
                    "step": 1,
                    "example": 7
                },
                "dp": {
                    "type": "number",
                    "min": "2",
                    "max": "{{d-1}}",
                    "step": 1,
                    "example": 4
                },
                "tdp": {
                    "type": "number",
                    "min": "1",
                    "max": "{{dp-1}}",
                    "step": 1,
                    "example": 2
                }
            }
        },
        "integerarithmetic_roundingdecplaces": {
            "title": "Rounding to decimal places",
            "description": "Rounding to decimal places 3-7 digits",
            "additionalparts": [],
            "question": "What is ${{floor(n/(10**(7-d)))/(10**dp)}}$ to ${{tdp}}$ decimal places?",
            "answer": {
                "type": "number",
                "label": "Answer:",
                "value": "{% if floor(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp) == round(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp) %}{{showDecimals(floor(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp), tdp)}}{%else%}{{showDecimals(ceil(floor(n/(10**(7-d)))/(10**(dp-tdp)))/(10**tdp), tdp)}}{%endif%}",
                "precision": "0.0000001",
                "decimals": "0"
            },
            "parameters": {},
            "variables": {
                "n": {
                    "type": "number",
                    "min": "1000000",
                    "max": "9999999",
                    "step": 1,
                    "example": 4916516
                },
                "d": {
                    "type": "number",
                    "min": "3",
                    "max": "7",
                    "step": 1,
                    "example": 6
                },
                "dp": {
                    "type": "number",
                    "min": "2",
                    "max": "{{d-1}}",
                    "step": 1,
                    "example": 3
                },
                "tdp": {
                    "type": "number",
                    "min": "1",
                    "max": "{{dp-1}}",
                    "step": 1,
                    "example": 2
                }
            }
        },
        "integerarithmetic_simplenegativenumberaddition": {
            "title": "Simple negative number addition",
            "description": "",
            "additionalparts": [],
            "question": "What is ${{a}}+{%if b>0%}{{b}}{%else%}({{b}}){%endif%}$?",
            "answer": {
                "type": "number",
                "label": "Answer:",
                "value": "{{a+b}}",
                "precision": "0",
                "decimals": "0"
            },
            "parameters": {},
            "variables": {
                "a": {
                    "type": "number",
                    "min": "-20",
                    "max": "10",
                    "step": 1,
                    "example": -13
                },
                "b": {
                    "type": "number",
                    "min": "-20",
                    "max": "10",
                    "step": 1,
                    "example": -5
                }
            }
        },
        "integerarithmetic_simplenegativenumbermultiplication": {
            "title": "Simple negative number multiplication",
            "description": "",
            "additionalparts": [],
            "question": "What is ${{a}}\\times{%if b>0%}{{b}}{%else%}({{b}}){%endif%}$?",
            "answer": {
                "type": "number",
                "label": "Answer:",
                "value": "{{a*b}}",
                "precision": "0",
                "decimals": "0"
            },
            "parameters": {},
            "variables": {
                "a": {
                    "type": "number",
                    "min": "-12",
                    "max": "12",
                    "step": 1,
                    "example": -10
                },
                "b": {
                    "type": "number",
                    "min": "-12",
                    "max": "12",
                    "step": 1,
                    "example": 5
                }
            }
        },
        "integerarithmetic_simplenegativenumberdivision": {
            "title": "Simple negative number division",
            "description": "",
            "additionalparts": [],
            "question": "What is ${{a*b}}\\div{%if b>0%}{{b}}{%else%}({{b}}){%endif%}$?",
            "answer": {
                "type": "number",
                "label": "Answer:",
                "value": "{{a}}",
                "precision": "0",
                "decimals": "0"
            },
            "parameters": {},
            "variables": {
                "a": {
                    "type": "number",
                    "min": "-12",
                    "max": "12",
                    "step": 1,
                    "example": -12
                },
                "b": {
                    "type": "number",
                    "min": "-12",
                    "max": "12",
                    "step": 1,
                    "example": -3
                }
            }
        },
        "integerarithmetic_simplenegativenumbersubtraction": {
            "title": "Simple negative number subtraction",
            "description": "",
            "additionalparts": [],
            "question": "What is ${{a}}-{%if b>0%}{{b}}{%else%}({{b}}){%endif%}$?",
            "answer": {
                "type": "number",
                "label": "Answer:",
                "value": "{{a-b}}",
                "precision": "0",
                "decimals": "0"
            },
            "parameters": {},
            "variables": {
                "a": {
                    "type": "number",
                    "min": "-20",
                    "max": "10",
                    "step": 1,
                    "example": 7
                },
                "b": {
                    "type": "number",
                    "min": "-20",
                    "max": 10,
                    "step": 1,
                    "example": -3
                }
            }
        },
        "2x2matrixvectormultiply": {
            "title": "Multiply a 2x2 matrix and a 1x2 vector",
            "description": "",
            "variables": {
                "a": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "b": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "c": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "d": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "e": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "f": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                }
            },
            "question": "What does is the resulting vector?",
            "answer": {
                "type": "fillins",
                "label": " ",
                "value": "$ \\begin{bmatrix} {{a}} & {{c}} \\\\ {{b}} & {{d}} \\end{bmatrix}\\begin{bmatrix} {{e}} \\\\ {{f}} \\end{bmatrix}=\\begin{bmatrix} {{fillin(a*e+c*f)}} \\\\ {{fillin(b*e+d*f)}} \\end{bmatrix} $\n"
            }
        },
        "2x2matrixmultiply": {
            "title": "Multiply a 2x2 matrix",
            "description": "Multiplying two 2x2 matrices",
            "variables": {
                "a": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "b": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "c": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "d": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "e": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "f": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "g": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                },
                "h": {
                    "type": "number",
                    "min": -5,
                    "max": 5,
                    "step": 1
                }
            },
            "question": "Multiply the following matrices",
            "answer": {
                "type": "fillins",
                "label": " ",
                "value": "$ \\begin{bmatrix} {{a}} & {{c}} \\\\ {{b}} & {{d}} \\end{bmatrix}\\begin{bmatrix} {{e}} & {{g}} \\\\ {{f}} & {{h}} \\end{bmatrix}=\\begin{bmatrix} {{fillin(a*e+c*f)}} & {{fillin(a*c+c*d)}} \\\\ {{fillin(b*e+d*f)}} & {{fillin(b*e+d*f)}} \\end{bmatrix} $\n"
            }
        }
    },
    "topics": {
        "Linear Algebra": {
            "title": "Linear Algebra",
            "description": "Vectors, matrices, and linear transformations",
            "level": 15,
            "exerciseids": [
                "matrixvector",
                "matrixmultiply"
            ]
        },
        "Integer Arithmetic": {
            "title": "Integer Arithmetic",
            "level": 99,
            "exerciseids": [
                "integerarithmetic_roundingsigfigures",
                "integerarithmetic_roundingdecplaces",
                "integerarithmetic_simplenegativenumbers"
            ]
        }
    }
}

export default repository