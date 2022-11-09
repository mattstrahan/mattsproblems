import { RepositorySpec } from "../classes/Repository"

const repository : RepositorySpec = {
    "courses": {
        "3blue1brown_linearalgebra": {
            "title": "3Blue1Brown - Essence of linear algebra",
            "description": "Exercises to support the 3Blue1Brown Essence of linear algebra playlist.",
            "exercises": [
                {
                    "exerciseid": "3blue1brownvectors"
                },
                {
                    "exerciseid": "matrixmultiply"
                }
            ]
        },
        "nsw_year_2": {
            "title": "NSW Year 2",
            "description": "Exercises for topics covered in Year 2 of the NSW syllabus.",
            "exercises": [
                {
                    "exerciseid": "simpleaddition"
                }
            ]
        },
        "nsw_year_9": {
            "title": "NSW Year 9",
            "description": "Exercises for topics covered in Year 9 of the NSW syllabus.",
            "topics": {
                "Revision of arithmetic and financial maths": [
                    {
                        "exerciseid": "integerarithmetic_simplenegativenumbers"
                    },
                    {
                        "exerciseid": "integerarithmetic_roundingsigfigures"
                    },
                    {
                        "exerciseid": "integerarithmetic_roundingdecplaces"
                    },
                    {
                        "exerciseid": "fractions_simplifyingandmixed"
                    }
                ]
            }
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
        "fractions_simplifyingandmixed": {
            "title": "Simplifying fractions and mixed numerals",
            "description": "Simplifying fractions, converting mixed numerals, and changing numerators and denominators",
            "topic": "Fractions",
            "parameters": {},
            "stages": [
                {
                    "type": "problem",
                    "probid": "fractions_mixednumerals"
                },
                {
                    "type": "problem",
                    "probid": "fractions_simplifying"
                },
                {
                    "type": "problem",
                    "probid": "fractions_changedenominator"
                },
                {
                    "type": "problem",
                    "probid": "fractions_changenumerator"
                }
            ],
            "finish": {
                "text": "You've finished!"
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
        },
        "3blue1brownvectors": {
            "title": "Vectors | Chapter 1",
            "description": "Vector introduction based on the first video of 3blue1brown",
            "topic": "",
            "parameters": {},
            "stages": [
                {
                    "type": "text",
                    "text": "This exercise is based off the first video of 3Blue1Brown's **Essence of linear algebra** playlist. Here we\nwill go through identifying the x and y components of vectors, vector addition, and vector scaling.\n\n\nThe video itself is available below:\n\n![fNk_zzaMoSs](youtube)."
                },
                {
                    "type": "problem",
                    "probid": "linearalgebra_vectorcomponentsgraph",
                    "repeats": 2
                },
                {
                    "type": "problem",
                    "probid": "linearalgebra_vectorcomponents"
                },
                {
                    "type": "text",
                    "text": "### Adding vectors\n\nTo add two vectors together, all you need to do is add the x and y values individually. Try dragging the red dots below to see how they add. Once you understand how it works, give it a go in the next few problems.\n\n{{JSXGraph(\"\n$board.setView([-1, 10, 10, -1]);\n\nxaxis=axis([0.0,-1.0],[0.0,0.0]);\nyaxis=axis([-1.0,0.0],[0.0,0.0]);\n\nv=point(1,3);\nv.name='\\\\\\\\vec{v}';\nv.snapToGrid=true; v.snapWidth=0.25;\nva=line([0,0],v);\nva.straightFirst=false;\nva.straightLast=false;\nva.lastArrow=true;\nva.strokeColor='#ee0';\nva.fixed=true;\n\n\nw=point(3,2);\nw.name='\\\\\\\\vec{w}';\nw.snapToGrid=true; w.snapWidth=0.25;\n\nvpw = point(function () { return v.X() + w.X(); },function () { return v.Y() + w.Y(); });\nvpw.size=0;\nvpw.fixed=true;\n\nwa=line([0,0],w);\nwa.straightFirst=false;\nwa.straightLast=false;\nwa.lastArrow=true;\nwa.strokeColor='#DB7093';\nwa.fixed=true;\n\nvw=point(\" + (vx + wx) + \",\" + (vy + wy) + \");\nvw.size=0;\nvw.name='';\nvw.fixed=true;\n\nvvpwa=segment(v,vpw);\nvvpwa.lastArrow=true;\nvvpwa.name='\\\\\\\\vec{w}';\nvvpwa.withLabel=true;\nvvpwa.strokeColor='#DB7093';\nvvpwa.fixed=true;\n\nvwa=segment([0,0],vpw);\nvwa.lastArrow=true;\nvwa.name='\\\\\\\\vec{v}+\\\\\\\\vec{w}';\nvwa.withLabel=true;\nvwa.strokeColor='#9400D3';\nvwa.fixed=true;\n\naddtext=text(1.2,9.5, function(){return '\\\\\\\\vec{v}+\\\\\\\\vec{w}=\\\\\\\\begin{bmatrix} '+v.X()+' \\\\\\\\\\\\\\\\ '+v.Y()+'\\\\\\\\end{bmatrix}+\\\\\\\\begin{bmatrix} '+w.X()+' \\\\\\\\\\\\\\\\ '+w.Y()+'\\\\\\\\end{bmatrix}=\\\\\\\\begin{bmatrix} '+v.X()+'+'+w.X()+' \\\\\\\\\\\\\\\\ '+v.Y()+'+'+w.Y()+'\\\\\\\\end{bmatrix}=\\\\\\\\begin{bmatrix} '+(v.X()+w.X())+' \\\\\\\\\\\\\\\\ '+(v.Y()+w.Y())+'\\\\\\\\end{bmatrix}';});\n\n\", {registerEvents:true})}}"
                },
                {
                    "type": "problem",
                    "probid": "linearalgebra_vectoradditiongraph",
                    "repeats": 2
                },
                {
                    "type": "problem",
                    "probid": "linearalgebra_vectoraddition",
                    "repeats": 2
                },
                {
                    "type": "problem",
                    "probid": "linearalgebra_vectorscalinggraph"
                },
                {
                    "type": "problem",
                    "probid": "linearalgebra_vectorscaling",
                    "repeats": 2
                }
            ],
            "finish": {
                "text": "You've finished!"
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
        "fractions_mixednumerals": {
            "title": "Mixed numeral fractions",
            "description": "",
            "additionalparts": [],
            "question": "Write the following fraction as a mixed numeral.",
            "answer": {
                "type": "fillins",
                "label": " ",
                "value": "$$\n\\frac{ {{b}} }{ {{a}} }={{fillin(floor(b/a))}}\\frac{ {{fillin((b%a))}} }{ {{a}} }\n$$"
            },
            "parameters": {},
            "variables": {
                "a": {
                    "type": "number",
                    "min": "2",
                    "max": 10,
                    "step": 1,
                    "example": 10
                },
                "b": {
                    "type": "number",
                    "min": "{{a+1}}",
                    "max": "30",
                    "step": 1,
                    "example": 28
                }
            }
        },
        "fractions_simplifying": {
            "title": "Simplifying fractions",
            "description": "",
            "additionalparts": [],
            "question": "Simplify the following fraction.",
            "answer": {
                "type": "fillins",
                "label": "Answer:",
                "value": "$$\n\\frac{ {{b*c}} }{ {{a*c}} }=\\frac{ {{fillin(b/gcd(a,b))}} }{ {{fillin(a/gcd(a,b))}} }\n$$"
            },
            "parameters": {},
            "variables": {
                "a": {
                    "type": "number",
                    "min": "3",
                    "max": "12",
                    "step": 1,
                    "example": 20
                },
                "b": {
                    "type": "number",
                    "min": "1",
                    "max": "{{a-1}}",
                    "step": 1,
                    "example": 4
                },
                "c": {
                    "type": "number",
                    "min": "2",
                    "max": "8",
                    "step": 1,
                    "example": 6
                }
            }
        },
        "fractions_changedenominator": {
            "title": "Changing fraction denominator",
            "description": "",
            "additionalparts": [],
            "question": "Fill in the missing number.",
            "answer": {
                "type": "fillins",
                "label": "Answer:",
                "value": "$$\n\\frac{ {{n}} }{ {{d}} }=\\frac{ {{fillin(n*m)}} }{ {{d*m}} }\n$$"
            },
            "parameters": {},
            "variables": {
                "d": {
                    "type": "number",
                    "min": "3",
                    "max": "12",
                    "step": 1,
                    "example": 9
                },
                "n": {
                    "type": "number",
                    "min": "1",
                    "max": "{{d-1}}",
                    "step": 1,
                    "example": 2
                },
                "m": {
                    "type": "number",
                    "min": "2",
                    "max": "8",
                    "step": 1,
                    "example": 4
                }
            }
        },
        "fractions_changenumerator": {
            "title": "Changing fraction numerator",
            "description": "",
            "additionalparts": [],
            "question": "Fill in the missing number.",
            "answer": {
                "type": "fillins",
                "label": "Answer:",
                "value": "$$\n\\frac{ {{n}} }{ {{d}} }=\\frac{ {{n*m}} }{ {{fillin(d*m)}} }\n$$"
            },
            "parameters": {},
            "variables": {
                "d": {
                    "type": "number",
                    "min": "3",
                    "max": "12",
                    "step": 1,
                    "example": 10
                },
                "n": {
                    "type": "number",
                    "min": "1",
                    "max": "{{d-1}}",
                    "step": 1,
                    "example": 3
                },
                "m": {
                    "type": "number",
                    "min": "2",
                    "max": "8",
                    "step": 1,
                    "example": 3
                }
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
            "question": "What is the resulting vector?",
            "answer": {
                "type": "fillins",
                "label": " ",
                "value": "$$\n\\begin{bmatrix}\n{{a}} & {{c}} \\\\\n{{b}} & {{d}}\n\\end{bmatrix}\\begin{bmatrix} {{e}} \\\\\n{{f}}\n\\end{bmatrix}=\\begin{bmatrix}\n{{fillin(a*e+c*f)}} \\\\\n{{fillin(b*e+d*f)}}\n\\end{bmatrix}\n$$"
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
                "value": "$$\n\\begin{bmatrix}\n{{a}} & {{c}} \\\\\n{{b}} & {{d}}\n\\end{bmatrix}\\begin{bmatrix} {{e}} & {{g}} \\\\\n{{f}} & {{h}}\n\\end{bmatrix}=\\begin{bmatrix}\n{{fillin(a*e+c*f)}} & {{fillin(a*c+c*d)}} \\\\\n{{fillin(b*e+d*f)}} & {{fillin(b*e+d*f)}}\n\\end{bmatrix}\n$$"
            }
        },
        "linearalgebra_vectorcomponentsgraph": {
            "title": "x and y components of vectors with graph",
            "description": "Identifying the x and y components of vectors with the help of a graph",
            "additionalparts": [
                {
                    "question": "",
                    "answer": {
                        "type": "number",
                        "label": "What is the $y$ component of $\\vec{v}$?",
                        "value": "{{y}}",
                        "precision": "0",
                        "decimals": "0"
                    }
                }
            ],
            "question": "{{JSXGraph(\"\n$board.setView([-6, 6, 6, -6]);\n\nxaxis=axis([0.0,-1.0],[0.0,0.0]);\nyaxis=axis([-1.0,0.0],[0.0,0.0]);\n\nv=point(\" + x + \",\" + y + \");\nv.size=0;\nva=line([0,0],v);\nva.straightFirst=false;\nva.straightLast=false;\nva.lastArrow=true;\n\nxline=segment([0,0],[\"+x+\",0]);\nxline.name='\"+x+\"';\nxline.withLabel=true;\nxline.labelColor='#f00';\nxline.strokeColor = '#f00';\nyline=segment([\"+x+\",0],[\"+x+\",\"+y+\"]);\nyline.name='\"+y+\"';\nyline.withLabel=true;\nyline.labelColor='#f00';\nyline.strokeColor = '#f00';\n\")}}\n\n$\\vec{v}$ is a vector where $\\vec{v}=\\begin{bmatrix} {{x}} \\\\ {{y}}\\end{bmatrix}$",
            "answer": {
                "type": "number",
                "label": "What is the $x$ component of $\\vec{v}$?",
                "value": "{{x}}",
                "precision": "0",
                "decimals": "0"
            },
            "parameters": {},
            "variables": {
                "x": {
                    "type": "number",
                    "min": "-5",
                    "max": "5",
                    "step": 1,
                    "example": 5
                },
                "y": {
                    "type": "number",
                    "min": "-5",
                    "max": "5",
                    "step": 1,
                    "example": -4
                }
            }
        },
        "linearalgebra_vectorcomponents": {
            "title": "x and y components of vector",
            "description": "Identifying the x and y components of a vector",
            "additionalparts": [
                {
                    "question": "",
                    "answer": {
                        "type": "number",
                        "label": "What is the $y$ component of $\\vec{v}$?",
                        "value": "{{y}}",
                        "precision": "0",
                        "decimals": "0"
                    }
                }
            ],
            "question": "$\\vec{v}$ is a vector where $\\vec{v}=\\begin{bmatrix} {{x}} \\\\ {{y}}\\end{bmatrix}$",
            "answer": {
                "type": "number",
                "label": "What is the $x$ component of $\\vec{v}$?",
                "value": "{{x}}",
                "precision": "0",
                "decimals": "0"
            },
            "parameters": {},
            "variables": {
                "x": {
                    "type": "number",
                    "min": "-9",
                    "max": "9",
                    "step": 1,
                    "example": 2
                },
                "y": {
                    "type": "number",
                    "min": "-9",
                    "max": "9",
                    "step": 1,
                    "example": 5
                }
            }
        },
        "linearalgebra_vectoradditiongraph": {
            "title": "Adding two vectors with graph",
            "description": "Adding two vectors together with the help of a graph",
            "additionalparts": [],
            "question": "{{JSXGraph(\"\n$board.setView([-1, 10, 10, -1]);\n\nxaxis=axis([0.0,-1.0],[0.0,0.0]);\nyaxis=axis([-1.0,0.0],[0.0,0.0]);\n\nv=point(\" + vx + \",\" + vy + \");\nv.size=0;\nv.name='\\\\\\\\vec{v}';\nva=line([0,0],v);\nva.straightFirst=false;\nva.straightLast=false;\nva.lastArrow=true;\nva.strokeColor='#ee0';\n\n\nw=point(\" + (vx + wx) + \",\" + (vy + wy) + \");\nw.size=0;\nw.name='\\\\\\\\vec{w}';\nwa=line(v,w);\nwa.straightFirst=false;\nwa.straightLast=false;\nwa.lastArrow=true;\nwa.strokeColor='#DB7093';\n\nvw=point(\" + (vx + wx) + \",\" + (vy + wy) + \");\nvw.size=0;\nvw.name='';\nvwa=segment([0,0],w);\nvwa.lastArrow=true;\nvwa.name='\\\\\\\\vec{v}+\\\\\\\\vec{w}';\nvwa.withLabel=true;\nvwa.strokeColor='#9400D3';\n\n\")}}\n\n$\\vec{v}$ and $\\vec{w}$ are vectors where $v=\\begin{bmatrix} {{vx}} \\\\ {{vy}}\\end{bmatrix}$ and $w=\\begin{bmatrix} {{wx}} \\\\ {{wy}}\\end{bmatrix}$. What is $\\vec{v}+\\vec{w}$?",
            "answer": {
                "type": "fillins",
                "label": "",
                "value": "$$\n\\begin{bmatrix} {{vx}} \\\\ {{vy}}\\end{bmatrix}+\\begin{bmatrix} {{wx}} \\\\ {{wy}}\\end{bmatrix}=\\begin{bmatrix} {{fillin(vx+wx)}} \\\\ {{fillin(vy+wy)}}\\end{bmatrix}\n$$"
            },
            "parameters": {},
            "variables": {
                "vx": {
                    "type": "number",
                    "min": "1",
                    "max": "5",
                    "step": 1,
                    "example": 2
                },
                "vy": {
                    "type": "number",
                    "min": "1",
                    "max": "5",
                    "step": 1,
                    "example": 5
                },
                "wx": {
                    "type": "number",
                    "min": "{{-1-vx}}",
                    "max": "{{10-vx}}",
                    "step": 1,
                    "example": 4
                },
                "wy": {
                    "type": "number",
                    "min": "{{-1-vy}}",
                    "max": "{{10-vy}}",
                    "step": 1,
                    "example": 4
                }
            }
        },
        "linearalgebra_vectoraddition": {
            "title": "Adding two vectors",
            "description": "Adding two vectors together",
            "additionalparts": [],
            "question": "",
            "answer": {
                "type": "fillins",
                "label": "",
                "value": "$$\n\\begin{bmatrix} {{vx}} \\\\ {{vy}}\\end{bmatrix}+\\begin{bmatrix} {{wx}} \\\\ {{wy}}\\end{bmatrix}=\\begin{bmatrix} {{fillin(vx+wx)}} \\\\ {{fillin(vy+wy)}}\\end{bmatrix}\n$$"
            },
            "parameters": {},
            "variables": {
                "vx": {
                    "type": "number",
                    "min": "-10",
                    "max": 10,
                    "step": 1,
                    "example": 4
                },
                "vy": {
                    "type": "number",
                    "min": "-10",
                    "max": 10,
                    "step": 1,
                    "example": 5
                },
                "wx": {
                    "type": "number",
                    "min": "-10",
                    "max": 10,
                    "step": 1,
                    "example": 9
                },
                "wy": {
                    "type": "number",
                    "min": "-10",
                    "max": 10,
                    "step": 1,
                    "example": 1
                }
            }
        },
        "linearalgebra_vectorscalinggraph": {
            "title": "Scaling a vector with graph",
            "description": "Multiplying a scalar and a vector to get a scaled vector with the help of a graph",
            "additionalparts": [],
            "question": "{{JSXGraph(\"\n$board.setView([-1, 10, 10, -1]);\n\nxaxis=axis([0.0,-1.0],[0.0,0.0]);\nyaxis=axis([-1.0,0.0],[0.0,0.0]);\n\nv=point(\" + vx + \",\" + vy + \");\nv.size=0;\nv.name='\\\\\\\\vec{v}';\nva=line([0,0],v);\nva.straightFirst=false;\nva.straightLast=false;\nva.lastArrow=true;\nva.strokeColor='#ee0';\n\n\nw=point(\" + (vx * scalar) + \",\" + (vy * scalar) + \");\nw.size=0;\nw.name='\\\\\\\\vec{w}';\nwa=line(v,w);\nwa.straightFirst=false;\nwa.straightLast=false;\nwa.lastArrow=true;\nwa.strokeColor='#DB7093';\n\n\")}}\n\n$\\vec{v}$ is a vector where $v=\\begin{bmatrix} {{vx}} \\\\ {{vy}}\\end{bmatrix}$. What is ${{scalar}}.\\vec{v}$?",
            "answer": {
                "type": "fillins",
                "label": "",
                "value": "$$\n{{scalar}}.\\begin{bmatrix} {{vx}} \\\\ {{vy}}\\end{bmatrix}=\\begin{bmatrix} {{fillin(vx*scalar)}} \\\\ {{fillin(vy*scalar)}}\\end{bmatrix}\n$$"
            },
            "parameters": {},
            "variables": {
                "vx": {
                    "type": "number",
                    "min": "1",
                    "max": "3",
                    "step": 1,
                    "example": 2
                },
                "vy": {
                    "type": "number",
                    "min": "1",
                    "max": "3",
                    "step": 1,
                    "example": 2
                },
                "scalar": {
                    "type": "number",
                    "min": "1",
                    "max": "{{min(10/vx,10/vy)}}",
                    "step": 1,
                    "example": 3
                }
            }
        },
        "linearalgebra_vectorscaling": {
            "title": "Scaling vector",
            "description": "",
            "additionalparts": [],
            "question": "",
            "answer": {
                "type": "fillins",
                "label": "",
                "value": "$$\n{{s}}.\\begin{bmatrix} {{vx}} \\\\ {{vy}}\\end{bmatrix}=\\begin{bmatrix} {{fillin(vx*scalar)}} \\\\ {{fillin(vy*scalar)}}\\end{bmatrix}\n$$"
            },
            "parameters": {},
            "variables": {
                "vx": {
                    "type": "number",
                    "min": "-10",
                    "max": 10,
                    "step": 1,
                    "example": 1
                },
                "vy": {
                    "type": "number",
                    "min": "-10",
                    "max": 10,
                    "step": 1,
                    "example": -8
                },
                "s": {
                    "type": "number",
                    "min": "-10",
                    "max": "10",
                    "step": 1,
                    "example": -3
                }
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
        "Fractions": {
            "title": "Fractions",
            "level": 99,
            "exerciseids": [
                "fractions_simplifyingandmixed"
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
        },
        "": {
            "title": "",
            "level": 99,
            "exerciseids": [
                "3blue1brownvectors"
            ]
        }
    }
}

export default repository