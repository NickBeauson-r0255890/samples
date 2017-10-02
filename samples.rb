require 'pathname'


SAMPLE_FILE = '.sample'

class Context
  def initialize(data)
    @data = data

    yield binding
  end
  
  def method_missing(m, *args)
    if @data.has_key? m
      raise "Key #{m} already defined"
    end

    @data[m] = args
  end
end


# Read sample file in current directory
def read_sample_file
  source = IO.read(SAMPLE_FILE)
  data = { path: Pathname.pwd }
  
  Context.new(data) do |bindings|
    eval source, bindings
  end

  data
end


# Look for samples
def scan
  if File.exists? SAMPLE_FILE
    yield read_sample_file
  else
    Dir['*'].select do |entry|
      File.directory? entry
    end.each do |directory|
      Dir.chdir directory do
        scan do |result|
          yield result
        end
      end
    end
  end
end

scan do |data|
  p data
end
